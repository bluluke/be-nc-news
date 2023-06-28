const express = require("express");
const app = express();

const { handleCustomErrors, handlePsqlErrors } = require('./errors');
const { getTopics } = require('./controllers/topicsController');
const { getEndpoints } = require('./controllers/endpointsController');
const { getArticles } = require('./controllers/articlesController');
const { getAllArticles } = require('./controllers/allArticlesController');



app.get("/api/topics/", getTopics);

app.get("/api", getEndpoints);

app.get("/api/articles/:article_id", getArticles);

app.get("/api/articles", getAllArticles);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
module.exports = app; 

