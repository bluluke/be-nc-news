
const { selectAllOfArticles } = require('../models/allArticlesModel');
const { checkColExists } = require('../models/checkModels')

exports.getAllArticles = (req, res, next) => {
  
 
  checkColExists('slug', 'topics', req.query.topic)
  .then((colExists) => {
   
    return selectAllOfArticles(req.query.topic, colExists)
  })
  .then((data) => {

    res.status(200).send(data);
  })
  .catch((err) => {
    next(err);
  })
}