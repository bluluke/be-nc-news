const { selectArticleComments } = require('../models/articleCommentsModel');
const { checkExists } = require('../models/checkModels');


exports.getArticleComments = (req, res, next) => {
    const articleId = Object.values(req.params);
   
    checkExists('article_id', 'articles', Number(articleId[0]))
    .then((idExists) => {
        return idExists;
    })
    .then((idExists) => {
        return selectArticleComments(articleId, idExists)
    })
    .then((comments) => {
        res.status(200).send({ comments: comments});
    })    
    .catch((err) => {
            next(err)
     });   
}




