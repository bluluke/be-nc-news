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


exports.checkValid = (name, expectedName) => {
    if(name === expectedName) {
        return true;
    } else {
        return false;
    }
}

exports.checkColExists = (col, table, item) => {
    return db
            .query(`SELECT ${col}  FROM ${table} WHERE ${col} = $1;`, [item])
            .then((data) => {
                if(data.rows.length === 0) {
                  
                    return false;
                } else {
                 
                    return true;
                }
                })
}


