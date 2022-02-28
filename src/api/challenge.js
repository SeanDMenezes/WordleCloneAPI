const { Challenges } = require("../models/Challenge");
const { getRandomWordOfLength } = require("./wordle");

const getChallenge = async (challengeID) => {
    const challenge = await Challenges.findOne({ challengeID });
    if (challenge) return challenge;
    return { error: "No challenge with that ID found" };
};

const createChallenge = async (numWords, wordLength) => {
    let challengeID = "";
    while (true) {
        challengeID = Array.from(Array(8), () =>
            Math.floor(Math.random() * 36).toString(36)
        ).join("");
        challengeID = challengeID.toUpperCase();
        if (await Challenges.findOne({ challengeID })) continue;
        break;
    }

    let words = [];
    for (let i = 0; i < numWords; ++i) {
        const nextWord = await getRandomWordOfLength(wordLength);
        words.push(nextWord);
    }

    const challenge = new Challenges({
        challengeID,
        words,
        active: true,
        players: [],
    });

    return await challenge.save();
};

const updatePlayerStats = async (challengeID, name, timeTaken, turnsTaken) => {
    const challenge = await Challenges.findOne({ challengeID });
    if (!challenge) return { error: "No challenge with that ID found." };

    const newPlayer = { name, timeTaken, turnsTaken };
    challenge.players.push(newPlayer);
    return await challenge.save();
};

module.exports = { getChallenge, createChallenge, updatePlayerStats };
