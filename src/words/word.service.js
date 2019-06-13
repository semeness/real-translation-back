const db = require('../helpers/db');
const userWordLinkService = require('../userWordLinks/userWordLink.service');
const Word = db.Word;
module.exports = {
    getById,
    getAll,
    create,
    update,
    delete: _delete
};

async function getWordIdFormattedData(userWordLinkList) {
    return userWordLinkList.reduce((prev, userWordLink) => ({...prev, [userWordLink.wordId]: true}), {});
}

function wordListFilter(userWordIdData) {
    return function (word) {
        return userWordIdData[word.id];
    }
}

async function getAll(userId) {
    const userWordLinkList = await userWordLinkService.getBy({userId});
    const userWordIdData = await getWordIdFormattedData(userWordLinkList);
    const wordList = await Word.find();

    return wordList.filter(wordListFilter(userWordIdData));
}

async function getById(id) {
    return await Word.findById(id);
}

async function create(wordParam) {
    const word = new Word(wordParam);
    return await word.save();
}

async function update(id, wordParam) {
    const word = Word.findById(id);

    if (!word) throw 'Word is not found';

    return await word.updateOne(wordParam);
}

async function _delete(id) {
    return await Word.findByIdAndRemove(id);
}