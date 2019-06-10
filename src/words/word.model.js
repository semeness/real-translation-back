const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    langId: { type: String, required: true},
    value: { type: String, required: true},
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Word', schema);