const config = require('../config.json');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {
    Exercise: require('../exercises/exercise.model'),
    User: require('../users/user.model'),
    Language: require('../languages/language.model'),
    Translation: require('../translations/translation.model'),
    WordExerciseUserLink: require('../wordExerciseUserLinks/wordExerciseUserLink.model'),
    UserWordLink: require('../userWordLinks/userWordLink.model'),
    UserTranslationLink: require('../userTranslationLinks/userTranslationLink.model'),
    Word: require('../words/word.model')
};