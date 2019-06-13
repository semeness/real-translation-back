const db = require('../helpers/db');
const UserTranslationLink = db.UserTranslationLink;
module.exports = {
    create,
    getBy,
};

async function create(wordParam) {
    const userTranslationLink = new UserTranslationLink(wordParam);
    return await userTranslationLink.save();
}

async function getBy(param) {
    return await UserTranslationLink.find(param);
}