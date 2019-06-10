const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    exerciseId: { type: String, required: true },
    wordId: { type: String, required: true },
    rating: { type: Number, required: true },
    userId: { type: String, required: true },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('WordExerciseUserLink', schema);