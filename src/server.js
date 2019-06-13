require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(jwt());
app.use('/users', require('./users/user.controller'));
app.use('/translations', require('./translations/translation.controller'));
app.use('/words', require('./words/word.controller'));
app.use('/languages', require('./languages/language.controller'));
app.use('/exercises', require('./exercises/exercise.controller'));
app.use('/wordExerciseUserLink', require('./wordExerciseUserLinks/wordExerciseUserLink.controller'));
app.use('/translationFilter', require('./translationFilter/translationFilter.controller'));
app.use(errorHandler);

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 8080;
const server = app.listen(port, () => {
    console.log('lingvsion gonna fuck these niggas up on ' + port);
});