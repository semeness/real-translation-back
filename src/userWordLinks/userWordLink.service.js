const db = require('../helpers/db');
const UserWordLink = db.UserWordLink;
module.exports = {
    create,
    getBy,
};

async function create(wordParam) {
    const userWordLink = new UserWordLink(wordParam);
    return await userWordLink.save();
}

async function getBy(param) {
    return await UserWordLink.find(param);
}