const db = require('../connection');


exports.checkExists = (column, table, id) => {
    return db   
        .query(`SELECT ${column} FROM ${table} WHERE ${column} = $1;`, [id])
        .then((responseId) => {
            if(responseId.rows.length !== 0) {
                return true;
            } else {
                return false;
            }
        })
} 




