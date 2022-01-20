require("dotenv/config");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);
const port = process.env.PORT || 5000;

const wordleRoutes = require("./routes/wordleRoutes");

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// routes
app.get("/", (req, res) => res.send("Backend up..."));
app.use("/api/wordleclone/", wordleRoutes);

server.listen(port, () => console.log(`Listening on port ${port}`));
