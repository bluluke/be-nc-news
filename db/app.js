const express = require("express");
const app = express();


const { getTopics } = require('./controllers/topicsController');
const { getEndpoints } = require('./controllers/endpointsController');
const { getArticles } = require('./controllers/articlesController');
app.get("/api/topics/", getTopics);



app.get("/api", getEndpoints);

app.get("/api/articles/:article_id", getArticles);
module.exports = app; 