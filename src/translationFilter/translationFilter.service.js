const translationFilterHelper= require('./helpers/translationFilter.es');
const translationService = require('../translations/translation.service');
const wordService = require('../words/word.service');

module.exports = {
    filter,
};

async function filter(translationList) {
    const DBTranslationList = await getDBTranslationList();

    return translationFilterHelper.translationListFilter(translationList, DBTranslationList);
}

async function getDBTranslationList() {
    const translationList = await translationService.getAll();
    const wordList = await wordService.getAll();
    return translationList.reduce((prev, {wordId1, wordId2}) => {
        return [
            ...prev,
            [
                getWordData(wordList, wordId1),
                getWordData(wordList, wordId2)
            ],
        ];
    }, []);
}

function getWordData(wordList, wordId) {
    return wordList.find((word) => {
        return word.id === wordId;
    });
}