
const { selectAllOfArticles } = require('../models/allArticlesModel');
const { checkColExists } = require('../models/checkModels')

exports.getAllArticles = (req, res, next) => {

  
  const sortBy = req.query.sort_by;
  const order = req.query.order;
  checkColExists('slug', 'topics', req.query.topic)
  .then((colExists) => {
    if(!['title', 'author', 'created_at', 'topic', 'votes', 'article_id', 'comment_count', 'article_img_url'].includes(sortBy) && sortBy !== undefined || !['asc', 'desc'].includes(order) && order !== undefined) {
        return Promise.reject({ status: 400, msg: 'Bad request'});
    }
 
    return selectAllOfArticles(req.query.topic, sortBy, order, colExists)
  })
  .then((data) => {
    res.status(200).send(data);
  })
  .catch((err) => {
    next(err);
  })
}