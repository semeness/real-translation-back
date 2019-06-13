const db = require('../helpers/db');
const Translation = db.Translation;
const Word = db.Word;
const wordService = require('../words/word.service');
const userTranslationLinkService = require('../userTranslationLinks/userTranslationLink.service');
const userWordLinkService = require('../userWordLinks/userWordLink.service');

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

async function getTranslationIdFormattedData(userTranslationLinkList) {
    return userTranslationLinkList.reduce((prev, userTranslationLink) => ({...prev, [userTranslationLink.translationId]: true}), {});
}

async function getAll(userId) {
    const userTranslationLinkList = await userTranslationLinkService.getBy({userId});
    const userTranslationIdFormattedData = await getTranslationIdFormattedData(userTranslationLinkList);
    const translationList = await Translation.find();

    return translationList.filter(translationListFilter(userTranslationIdFormattedData));
}

function translationListFilter(userTranslationIdFormattedData) {

    return function (translation) {
        return userTranslationIdFormattedData[translation.id];
    }
}

async function createWordRecord(wordParam, userId) {
    const [wordRecord] = await Word.find(wordParam);

    if (!wordRecord) {
        const newWordRecord = await wordService.create(wordParam);
        await userWordLinkService.create({
            userId: userId,
            wordId: newWordRecord.id,
        });
        return newWordRecord;
    }

    return wordRecord;
}

async function create({body: translationParamList, user: {sub: currentUserId}}) {
    let result = [];

    for(let i=0; i < translationParamList.length; i++) {
        const {word1: wordParam1, word2: wordParam2} = translationParamList[i];
        const wordRecord1 = await createWordRecord(wordParam1, currentUserId);
        const wordRecord2 = await createWordRecord(wordParam2, currentUserId);
        const translationParam = {
            wordId1: wordRecord1.id,
            wordId2: wordRecord2.id,
        };
        const translationEntity = new Translation(translationParam);
        const translationRecord = await translationEntity.save();

        await userTranslationLinkService.create({
            userId: currentUserId,
            translationId: translationRecord.id,
        });
        const translation = {
            id: translationRecord.id,
            word1: wordRecord1,
            word2: wordRecord2,
        };

        result[i] = translation;
    }

    return result;
}

async function update(id, translationParam) {
    const translation = Translation.findById(id);

    if (!translation) throw 'Translation is not found';

    return await translation.updateOne(translationParam);
}

async function _delete(id) {
    return await Translation.findByIdAndRemove(id);
}