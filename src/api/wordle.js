const fetch = require("node-fetch");
const WORDS_ENDPOINT = process.env.WORDS_ENDPOINT;
const allWords = require("../allWords");

const getCommonWords = async () => {
    return allWords;
};

const getAllWords = async () => {
    const words = await fetch(WORDS_ENDPOINT, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return JSON.parse(await words.text());
}

const getWordsOfLength = async (wordLength) => {
    const allWords = await getCommonWords();
    return allWords.filter(word => word.length == wordLength);
};

const getRandomWordOfLength = async (wordLength) => {
    const wordsOfLength = await getWordsOfLength(wordLength);
    return wordsOfLength[Math.floor(Math.random() * wordsOfLength.length)];
};

const isValidWord = async (word) => {
    const allWords = await getAllWords();
    return allWords.includes(word.toLowerCase());
};

module.exports = { getCommonWords, getWordsOfLength, getRandomWordOfLength, isValidWord };
