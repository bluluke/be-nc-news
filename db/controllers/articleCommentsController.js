const { selectArticleComments, insertComment, removeComment} = require('../models/articleCommentsModel');
const { checkExists, checkValid } = require('../models/checkModels');


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
    const newComment = req.body.body; 
    const usernameReq = req.body.username 
    const reqBodyKeys = Object.keys(req.body);
    const usernameProp = reqBodyKeys[0];
    const articleId = Object.values(req.params); 
    const articleIdNum = Number(articleId);

    const promise1 = checkExists('article_id', 'articles', Number(articleId[0]));
    const promise2 = checkExists('username', 'users', usernameReq);
    const promise3 = checkValid(usernameProp, 'username');
   
    Promise.all([promise1, promise2, promise3])
    .then((fulfilledProms) => {
        return fulfilledProms;
    })
    .then((fulfilledProms) => {
        return insertComment(newComment, articleIdNum, usernameReq, fulfilledProms[0], fulfilledProms[1], fulfilledProms[2])
    })
    .then((comment) => {
    res.status(201).send({ comment: comment });   
    })    
    .catch((err) => {
            next(err)
     });   
}


exports.deleteComment = (req, res, next) => {
    const commentId = Number(req.params.comment_id);


    checkExists('comment_id', 'comments', commentId)
    .then((idExists) => {
        return idExists
    })
    .then((idExists) => {   
        return removeComment(commentId, idExists)
    })
    .then((isDeleted) => {
        if(isDeleted) {
            res.status(204).send({});
        } 
    })
    .catch((err) => {
       
        next(err)
    })
}






