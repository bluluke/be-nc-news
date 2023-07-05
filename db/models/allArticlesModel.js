const db = require('../connection');

exports.selectAllOfArticles = (reqQueryTopic, colExists) => {
   
const queryBeginning = `SELECT articles.*, COUNT(comments.article_id) AS comment_count
FROM comments 
RIGHT JOIN articles 
ON comments.article_id = articles.article_id `
const filterQuery = `WHERE topic = $1 `;
const queryEnd = ` GROUP BY articles.article_id
ORDER BY created_at DESC;`;

let completeQuery;
let queryValues = [];


if(reqQueryTopic) {
     completeQuery = queryBeginning + filterQuery + queryEnd;
     queryValues.push(reqQueryTopic);
} else {
    completeQuery = queryBeginning + queryEnd;
}
return db
    .query(completeQuery, queryValues)
    .then((data) => {
        if(!colExists && data.rows.length === 0) {
            return Promise.reject({status: 404, msg: 'Not found'});  
        } else {
            const articleArray = data.rows.map((article) => {
                const { body, ...rest} = article;
                return rest;
            });
        
        return articleArray;
        }
    })
}





