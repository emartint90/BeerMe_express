const dbConfig = require("../dbConfig");

const getByName = (pNombre) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM cervezas WHERE nombre = ?', [pNombre], (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        })

    });
}

const getByPais = (pNombre) => {
    return new promise((resolve, reject) => {
        db.query('SELECT * FROM cervezas WHERE pais = ?', [pPais], (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        })
    });
}



module.exports = {
    getByName, getByPais
}