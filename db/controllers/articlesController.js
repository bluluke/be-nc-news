
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
    const incVal = req.body.inc_votes;
    const articleIdNum = Number(req.params.article_id);
    
    checkExists('article_id', 'articles', articleIdNum)
    .then((fulProm) => {
        return fulProm;
    })
    .then((fulProm) => {
        return updateVote(incVal, articleIdNum, fulProm)
    })
    .then((updatedArticle) => {
        res.status(200).send({ article: updatedArticle });
    })
    .catch((err) => {
        next(err)
    });
}


