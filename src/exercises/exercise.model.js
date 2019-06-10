const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    languageId: { type: String, required: true },
    name: { type: String, required: true },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Exercise', schema);