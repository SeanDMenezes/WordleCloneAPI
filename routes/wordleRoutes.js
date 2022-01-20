const express = require("express");
const { getWordsOfLength, getRandomWordOfLength, isValidWord, getCommonWords } = require("../api/wordle");
const wordleRoutes = express.Router();

wordleRoutes.get("/GetAllWords", async (req, res) => {
    try {
        const allWords = await getCommonWords();
        res.json(allWords);
    } catch (err) {
        res.json({ error: err });
    }
});

wordleRoutes.get("/GetWordsOfLength/:wordLength", async (req, res) => {
    try {
        const { wordLength } = req.params;
        const words = await getWordsOfLength(wordLength);
        res.json(words);
    } catch (err) {
        res.json({ error: err });
    }
});

wordleRoutes.get("/GetRandomWordOfLength/:wordLength", async (req, res) => {
    try {
        const { wordLength } = req.params;
        const word = await getRandomWordOfLength(wordLength);
        console.log(word);
        res.json(word);
    } catch (err) {
        res.json({ error: err });
    }
});

wordleRoutes.get("/isValidWord/:word", async (req, res) => {
    try {
        const { word } = req.params;
        const isValid = await isValidWord(word);
        res.json(isValid);
    } catch (err) {
        console.log(err);
        res.json({ error: err });
    }
});

module.exports = wordleRoutes;
