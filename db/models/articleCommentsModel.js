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


exports.insertComment = (comment, articleId, username, articleIdExists, usernameExists, usernamePropValid) => {

    const usernameDefined = typeof username !== 'undefined';
    const commentDefined = typeof comment !== 'undefined';
    const insertQuery = `INSERT INTO comments
        (body, article_id, author)
        VALUES ($1, $2, $3) RETURNING*;`
        
  
 

    if(articleIdExists && usernameExists && usernamePropValid && usernameDefined && commentDefined) {
       return db
       .query(insertQuery, [comment, articleId, username])
       .then((data) => {
            
            return data.rows;
        }) 
    } else { 
         if(usernamePropValid === false) {
            return Promise.reject({status: 400, msg: "Bad request"})
         }
         if(usernameExists === false || articleIdExists === false) {
            return Promise.reject({status: 404, msg: "Not found"})
         } 
         else {
            return Promise.reject({status: 400, msg: "Bad request"})
         } 
    }
}



