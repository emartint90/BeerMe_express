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
        pNombre = pNombre.trimEnd().trimStart();
        db.query('SELECT * FROM cervezas WHERE nombre = ?', [pNombre], (err, rows) => {
            console.log(rows.length);
            if (err) {
                reject(err);
            }
            resolve(rows);
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
        });
    });
}

const deleteFav = (pUserId, pCervezaFav) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM beerme.tbi_cervezas_usuarios WHERE id_cervezas= ? AND id_usuarios=?', [pCervezaFav, pUserId], (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(rows);
        });
    });
}

// const getFav = (pUserId, pCervezaFav) => {
//     return new Promise((resolve, reject) => {
//         db.query('SELECT * FROM beerme.tbi_cervezas_usuarios WHERE id_usuarios= ? AND id_cervezas= ?;', [pUserId, pCervezaFav], (err, rows) => {
//             if (err) return reject(err);
//             if (rows.length !== 0) resolve(null);
//             resolve(rows);
//         });
//     });
// }

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

const cervezasFav = (pUserId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT c.* FROM beerme.tbi_cervezas_usuarios cu, beerme.cervezas c WHERE id_usuarios= ? AND cu.id_cervezas= c.id;', [pUserId], (err, rows) => {
            if (err) {
                return reject(err)
            }
            resolve(rows)
        });
    });
}

const paises = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT DISTINCT pais FROM beerme.cervezas;', (err, rows) => {
            if (err) {
                return reject(err)
            }
            resolve(rows)
        });
    });
}




module.exports = {
    getByName, getByFav, getByPais, createCerveza, getByNameUnique, cervezasFav, deleteFav, paises
}