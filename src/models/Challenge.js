const mongoose = require("mongoose");

const ChallengeSchema = mongoose.Schema({
    challengeID: String,
    words: [String],
    active: String,
    players: [
        {
            name: String,
            timeTaken: Number,
            turnsTaken: Number,
        },
    ],
});

const Challenges = mongoose.model("Challenges", ChallengeSchema);

module.exports = { ChallengeSchema, Challenges };
