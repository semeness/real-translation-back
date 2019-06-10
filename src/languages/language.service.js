const db = require('../helpers/db');
const Language = db.Language;
module.exports = {
    getById,
    create,
    update,
    delete: _delete
};

async function getById(id) {
    return await Language.findById(id);
}

async function create(languageParam) {
    const language = new Language(languageParam);
    return await language.save();
}

async function update(id, languageParam) {
    const language = Language.findById(id);

    if (!language) throw 'Language is not found';

    return await language.updateOne(languageParam);
}

async function _delete(id) {
    return await Language.findByIdAndRemove(id);
}