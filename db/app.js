const express = require("express");
const app = express();
app.use(express.json());


const { getTopics } = require('./controllers/topicsController');

app.get("/api/topics", getTopics);

module.exports = app; 