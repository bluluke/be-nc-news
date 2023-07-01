const db = require('../connection');


exports.selectUsers = () => {
    
    return db
    .query(`SELECT * FROM users;`)
    .then((usersData) => {
        return usersData.rows;
    })
}