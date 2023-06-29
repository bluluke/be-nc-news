const db = require('../connection');



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


exports.insertComment = (comment, articleId, articleIdExists, usernameExists) => {
    const {body, username} = comment; 
    
    const insertQuery = `INSERT INTO comments
        (body, article_id, author)
        VALUES ($1, $2, $3) RETURNING *;`
        
    if(articleIdExists && usernameExists) {   
       return db.query(insertQuery, [body, Number(articleId[0]), username])
        .then((data) => {
            return data.rows;
        }) 
    } else { 
         return Promise.reject({status: 404, msg: "Not found"})
     }
}


