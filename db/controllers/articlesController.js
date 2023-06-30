
const { selectAllArticles, updateVote } = require('../models/articlesModel');
const {checkValid, checkExists} = require('../models/checkModels');

exports.getArticles = (req, res, next) => {
    
    selectAllArticles(req).then((articleObject) => {
     
        res.status(200).send(articleObject);
        })
        .catch((err) => {
     
            next(err)
        })
}

exports.patchVote = (req, res, next) => {
    const incPropInArray = Object.keys(req.body);
    const incProp = incPropInArray[0];
    const incValInArray = Object.values(req.body);
    const incVal = incValInArray[0];
    const articleId = Object.values(req.params); 
    const articleIdNum = Number(articleId[0]);

    
    const promise1 = checkExists('article_id', 'articles', articleIdNum);
    const promise2 = checkValid(incProp, 'inc_votes');
    
    Promise.all([promise1, promise2])
    .then((fulProms) => {
        return fulProms;
    })
    .then((fulProms) => {
        return updateVote(incVal, articleIdNum, fulProms[0], fulProms[1])
    })
    .then((updatedArticle) => {
        res.status(200).send({ article: updatedArticle });
    })
    .catch((err) => {
        next(err)
    });
}