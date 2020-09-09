const dbConfig = require("../dbConfig");

const getByName = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM cervezas WHERE nombre = ?', (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        })

    });
}



module.exports = {
    getByName
}