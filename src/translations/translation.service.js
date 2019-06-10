const db = require('../helpers/db');
const Translation = db.Translation;
const wordService = require('../words/word.service');

module.exports = {
    getById,
    getAll,
    create,
    update,
    delete: _delete
};

async function getById(id) {
    return await Translation.findById(id);
}

async function getAll() {
    return await Translation.find();
}

async function getTranslationListResponse(translationParamList) {
    let result = [];

    for(let i=0; i < translationParamList.length; i++) {
        const {word1, word2} = translationParamList[i];
        const wordRecord1 = await wordService.create(word1);
        const wordRecord2 = await wordService.create(word2);
        const translationParam = {
            wordId1: wordRecord1.id,
            wordId2: wordRecord2.id,
        };
        const translationEntity = new Translation(translationParam);
        const translationRecord = await translationEntity.save();

        const translation = {
            id: translationRecord.id,
            word1: wordRecord1,
            word2: wordRecord2,
        };

        result[i] = translation;
    }

    return result;
}

async function create(translationParamList) {

    return getTranslationListResponse(translationParamList);
}

async function update(id, translationParam) {
    const translation = Translation.findById(id);

    if (!translation) throw 'Translation is not found';

    return await translation.updateOne(translationParam);
}

async function _delete(id) {
    return await Translation.findByIdAndRemove(id);
}