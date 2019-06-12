const dictionary = require('./words_dictionary.json');

module.exports = {
    translationListFilter,
};
    function translationListFilter(translationList, DBTranslationList) {
        if (!translationList) {
            return [];
        }
        return translationList
            .map(valueToLower)
            .filter(checkNotEqual)
            .reduce(removeDuplicates, [])
            .filter(checkExistence)
            .filter(checkDBExistence(DBTranslationList));
    }

    function checkNotEqual([word1, word2]) {
        return word1.value !== word2.value;
    }

    function valueToLower([word1, word2]) {
        return [{ ...word1, value: word1.value.toLowerCase() }, { ...word2, value: word2.value.toLowerCase() }];
    }

    function existIn(wordList, [word1ToCheck, word2ToCheck]) {
        return wordList.some(
            ([word1, word2]) => (word1ToCheck.value === word1.value && word2ToCheck.value === word2.value) || (word1ToCheck.value === word2.value && word2ToCheck.value === word1.value)
        );
    }

    function removeDuplicates(result, wordPair) {
        const alreadyExist = existIn(result, wordPair);
        if (alreadyExist) {
            return result;
        }
        return [...result, wordPair];
    }

    function checkExistence([word1, word2]) {
        const enWord = word1.langId === 'en' ? word1 : word2;

        return dictionary[enWord.value];
    }

    function checkDBExistence(DBTranslationList) {
        return function(wordPair) {
            return !existIn(DBTranslationList, wordPair);
        }
    }