
const { selectAllArticles } = require('../models/articlesModel');


exports.getArticles = (req, res, next) => {
    
    selectAllArticles(req).then((articleObject) => {
       
        res.status(200).send(articleObject)
;    })
}