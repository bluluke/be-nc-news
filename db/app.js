const express = require("express");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const { handleCustomErrors, handlePsqlErrors } = require('./errors');
const { getTopics } = require('./controllers/topicsController');
const { getEndpoints } = require('./controllers/endpointsController');
const { getArticles } = require('./controllers/articlesController');
const { getAllArticles } = require('./controllers/allArticlesController');
const { getArticleComments, postComment } = require('./controllers/articleCommentsController');


app.get("/api/topics/", getTopics);

app.get("/api", getEndpoints);

app.get("/api/articles/:article_id", getArticles);

app.get("/api/articles", getAllArticles);

app.get("/api/articles/:article_id/comments", getArticleComments);

app.post("/api/articles/:article_id/comments", postComment);

app.all('*', (_, res) => {
    res.status(404).send({status: 404, msg: "Not found"})
});

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
module.exports = app; 

