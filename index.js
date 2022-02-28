require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);
const port = process.env.PORT || 5000;

const wordleRoutes = require("./src/routes/wordleRoutes");
const challengeRoutes = require("./src/routes/challengeRoutes");

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// routes
app.get("/", (req, res) => res.send("Backend up..."));
app.use("/api/wordleclone/", wordleRoutes);
app.use("/api/wordleclone/challenge", challengeRoutes);

// connect to db
mongoose
    .connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((res) => console.log("connected to db"))
    .catch((err) => console.log(err));

server.listen(port, () => console.log(`Listening on port ${port}`));
