const express = require("express");
const {
    getChallenge,
    createChallenge,
    updatePlayerStats,
} = require("../api/challenge");
const challengeRoutes = express.Router();

challengeRoutes.get("/getChallenge/:challengeID", async (req, res) => {
    try {
        const { challengeID } = req.params;
        const challenge = await getChallenge(challengeID);
        res.json(challenge);
    } catch (err) {
        res.json({ error: err });
    }
});

challengeRoutes.post("/CreateChallenge", async (req, res) => {
    try {
        const { numWords, wordLength } = req.body;
        console.log(`Creating a challenge with ${numWords} words.`);
        const challenge = await createChallenge(numWords, wordLength);
        res.json(challenge);
    } catch (err) {
        res.json({ error: err });
    }
});

challengeRoutes.post("/SetPlayerStats", async (req, res) => {
    try {
        const { challengeID, name, timeTaken, turnsTaken } = req.body;
        console.log(
            `Submitting to challenge ${challengeID}: ${name} - ${timeTaken} seconds, ${turnsTaken} turns.`
        );
        const updatedChallenge = await updatePlayerStats(
            challengeID,
            name,
            timeTaken,
            turnsTaken
        );
        res.json(updatedChallenge);
    } catch (err) {
        res.json({ error: err });
    }
});

module.exports = challengeRoutes;
