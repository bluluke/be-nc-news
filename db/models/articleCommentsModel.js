const db = require('../connection');
const { checkArticleIdExists } = require('./checkModels');


exports.selectArticleComments = (articleId, idExists) => {
  
    return db
        .query("SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at;", articleId) 
        .then((commentData) => {
            if(idExists) {
            return commentData.rows;
            } else {
                return Promise.reject({status: 404, msg: "Not found"})
            }
        })
};



