const db = require('../connection');

exports.selectAllOfArticles = (reqQueryTopic, sortBy, order, colExists) => {

const queryBeginning = `SELECT articles.*, COUNT(comments.article_id) AS comment_count
FROM comments 
RIGHT JOIN articles 
ON comments.article_id = articles.article_id `
const filterQuery = `WHERE topic = $1 `;
const queryGroupClause = ` GROUP BY articles.article_id `;
let sortByQuery = `ORDER BY `;
let orderQuery = ` DESC;`
if(sortBy) { 
    sortByQuery+= sortBy 
} else {
    sortByQuery+= `created_at`
};

if(order) {
    orderQuery = ` ${order};`
}


let completeQuery;
let queryValues = [];


if(reqQueryTopic) {
     completeQuery = queryBeginning + filterQuery + queryGroupClause + sortByQuery + orderQuery;
     queryValues.push(reqQueryTopic);
} else {
    completeQuery = queryBeginning + queryGroupClause + sortByQuery + orderQuery;

}
return db
    .query(completeQuery, queryValues)
    .then((data) => {
        if(!colExists && data.rows.length === 0) {
            return Promise.reject({status: 404, msg: 'Not found'});  
        } else {
            const articleArray = data.rows.map((article) => {
                const { body, comment_count, ...rest} = article;
                const convertedCommentCount = parseInt(comment_count);
                return { ...rest, comment_count: convertedCommentCount };
            });
        return articleArray;
        }
    })
}






