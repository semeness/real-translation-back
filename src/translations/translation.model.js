const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    wordId1: { type: String, required: true },
    wordId2: { type: String, required: true},
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Translation', schema);