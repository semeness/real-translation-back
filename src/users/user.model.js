const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: { type: String, required: true },
    hash: { type: String, required: true },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);