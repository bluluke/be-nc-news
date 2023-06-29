const { selectArticleComments, insertComment } = require('../models/articleCommentsModel');
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


exports.postComment = (req, res, next) => {
    const newComment = req.body; 
    const usernameReq = req.body.username 
    const articleId = Object.values(req.params); 
   
    

    const promise1 = checkExists('article_id', 'articles', Number(articleId[0]));
    const promise2 = checkExists('username', 'users', usernameReq);

    Promise.all([promise1, promise2])
    .then((fulfilledProms) => {
        return fulfilledProms;
    })
    .then((fulfilledProms) => {
        return insertComment(newComment, articleId, fulfilledProms[0], fulfilledProms[1])
       })
    .then((comment) => {
    res.status(201).send({ comment: comment });   
    })    
    .catch((err) => {
            next(err)
     });   
}

