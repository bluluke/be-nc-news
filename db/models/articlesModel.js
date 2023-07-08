const db = require('../connection');

exports.selectAllArticles = (req) => {
    const articleId =  Object.values(req.params);
    return db
        .query(`SELECT articles.*, COUNT(comments.article_id) AS comment_count
                FROM comments
                RIGHT JOIN articles ON comments.article_id = articles.article_id
                WHERE articles.article_id = $1
                GROUP BY articles.article_id;`, articleId)
        .then((data) => {
            const articleObj = data.rows;
            if(articleObj.length !== 0) { 
            articleObj[0].comment_count = Number(articleObj[0].comment_count)
            return articleObj;
            } else {
                return Promise.reject({status: 404, msg: "Not found"})
            }
        })
}


exports.updateVote = (incVal, articleIdNum, idExists) => {
 
    const isIncValDefined = typeof incVal !== 'undefined';
   

    if(idExists && isIncValDefined) {
      
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
         if(isIncValDefined === false) {
            return Promise.reject({status: 400, msg: "Bad request"});
         } else {
        return Promise.reject({status: 404, msg: "Not found"});
         }
    }
}



// exports.selectAllArticles = (req) => {
//     const articleId =  Object.values(req.params);
//     return db
//         .query("SELECT * FROM articles WHERE article_id = $1;", articleId)
//         .then((articleObject) => {
//             if(articleObject.rows.length !== 0) {
//             return articleObject.rows;
//             } else {
//                 return Promise.reject({status: 404, msg: "Not found"})
//             }
//         })
    
// }