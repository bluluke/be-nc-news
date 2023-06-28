
const { selectAllOfArticles } = require('../models/allArticlesModel');

exports.getAllArticles = (req, res, next) => {
  selectAllOfArticles().then((data) => {
    res.status(200).send(data);
  })
}