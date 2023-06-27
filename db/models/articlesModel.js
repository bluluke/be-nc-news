const db = require('../connection');

exports.selectAllArticles = (req) => {
    const articleId =  Object.values(req.params);
    return db
        .query("SELECT * FROM articles WHERE article_id = $1;", articleId)
        .then((articleObject) => {
            if(articleObject.rows.length !== 0) {
            return articleObject.rows;
            } else {
                return Promise.reject({status: 404, msg: "Not found"})
            }
        })
    
}





