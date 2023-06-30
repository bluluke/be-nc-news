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


exports.updateVote = (incVal, articleIdNum, idExists, validKey) => {
 
    
    if(idExists && validKey) {
        return db   
            .query(`UPDATE articles SET votes = votes + $1 WHERE article_id = $2;`, [incVal, articleIdNum])
            .then(() => {
            })
            .then(()=> {
                return db.query(`SELECT * FROM articles WHERE article_id = 1;`)
            }).then((result) => {
                return result.rows;
            })
    } else {
        if(validKey === false) {
            return Promise.reject({status: 400, msg: "Bad request"});
        } else {
        return Promise.reject({status: 404, msg: "Not found"});
        }
    }
}



