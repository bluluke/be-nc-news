const db = require('../connection');

exports.selectAllOfArticles = (req) => {

    return db
        .query("WITH article_cols AS (SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url FROM articles), comment_count AS (SELECT article_id, COUNT(*) AS comment_count FROM comments GROUP BY article_id), article_comment_count AS (SELECT * FROM article_cols JOIN comment_count ON article_cols.article_id = comment_count.article_id) SELECT * FROM article_comment_count ORDER BY created_at desc;")
        .then((data) => {const articleArray = data.rows;
           return articleArray;
        })
}

