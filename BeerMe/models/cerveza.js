const dbConfig = require("../dbConfig");

const getByName = (pNombre) => {
    return new Promise((resolve, reject) => {
        pNombre = "%" + pNombre + "%";
        db.query('SELECT * FROM cervezas WHERE nombre LIKE ?', [pNombre], (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        })

    });
}

const getByNameUnique = (pNombre) => {
    return new Promise((resolve, reject) => {
        pNombre = toString(pNombre).trimEnd().trimStart();
        db.query('SELECT * FROM cervezas WHERE nombre = ?', [pNombre], (err, rows) => {
            if (err) {
                reject(err);
            }
            if (rows.length !== 1) resolve(null);
            resolve(rows[0]);
        })

    });
}

const getByPais = (pPais) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM cervezas WHERE pais = ?', [pPais], (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        })
    });
}

const getByFav = (pUserId, pCervezaFav) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO tbi_cervezas_usuarios (id_cervezas, id_usuarios) VALUES (?, ?)', [pCervezaFav, pUserId], (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(rows);
        })
    });
}

const createCerveza = ({ nombre, cervecera, pais, tipo, graduacion_alcohol, descripcion }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO cervezas (nombre, cervecera, pais, tipo, graduacion_alcohol, descripcion) VALUES (?, ?, ?, ?, ?, ?)', [nombre, cervecera, pais, tipo, graduacion_alcohol, descripcion], (err, result) => {
            if (err) {
                return reject(err)
            }
            resolve(result);
        });
    });
}



module.exports = {
    getByName, getByFav, getByPais, createCerveza, getByNameUnique
}