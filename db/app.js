const express = require("express");
const app = express();

const { handleCustomErrors } = require('./errors');
const { getTopics } = require('./controllers/topicsController');
const { getEndpoints } = require('./controllers/endpointsController');
const { getArticles } = require('./controllers/articlesController');
app.get("/api/topics/", getTopics);



app.get("/api", getEndpoints);

app.get("/api/articles/:article_id", getArticles);

app.use(handleCustomErrors);

module.exports = app; 

