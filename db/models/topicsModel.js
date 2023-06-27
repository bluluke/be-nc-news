
const db = require('../connection');

exports.selectTopics = (arg) => {
    return db
    .query('SELECT * FROM topics;').then((data) => {
        return data.rows;
    })
}