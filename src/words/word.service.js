const db = require('../helpers/db');
const Word = db.Word;
module.exports = {
    getById,
    getAll,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Word.find();
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