
const db = require('../connection');

exports.selectTopics = () => {
    return db
    .query('SELECT * FROM topics;').then((data) => {
        return data.rows;
    })
}