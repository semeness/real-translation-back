const db = require('../helpers/db');
const WordExerciseUserLink = db.WordExerciseUserLink;
module.exports = {
    getById,
    getAll,
    create,
    update,
    delete: _delete
};

async function getAll(userId) {
    return await WordExerciseUserLink.find({userId});
}

async function create(wordExerciseUserLinkParamList) {
    const result = [];

    for(let i=0; i < wordExerciseUserLinkParamList.length; i++) {
        const wordExerciseUserLinkParam = wordExerciseUserLinkParamList[i];
        const wordExerciseUserLinkEntity = new WordExerciseUserLink(wordExerciseUserLinkParam);
        const wordExerciseUserLinkEntityRecord = await wordExerciseUserLinkEntity.save();
        result.push(wordExerciseUserLinkEntityRecord);
    }

    return result;
}

async function update(wordExerciseUserLinkParamList) {
    const result = [];

    for(let i=0; i < wordExerciseUserLinkParamList.length; i++) {
        const wordExerciseUserLinkParam = wordExerciseUserLinkParamList[i];
        const wordExerciseUserLink = await WordExerciseUserLink.findById(wordExerciseUserLinkParam.id);

        if (!wordExerciseUserLink) throw 'WordExerciseUserLink is not found, prodBy 2TGCB';

        await wordExerciseUserLink.updateOne(wordExerciseUserLinkParam);
        result.push(wordExerciseUserLinkParam);
    }

    return result;
}

async function getById(id) {
    return await WordExerciseUserLink.findById(id);
}

async function _delete(id) {
    return await WordExerciseUserLink.findByIdAndRemove(id);
}