const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    userId: { type: String, required: true},
    translationId: { type: String, required: true},
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('UserTranslationLink', schema);