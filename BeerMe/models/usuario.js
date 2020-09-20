const dbConfig = require("../dbConfig");

const create = ({ nombre, email, fecha_nacimiento, password }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO usuarios (nombre, email, fecha_nacimiento, password) values (?, ?, ?, ?)', [nombre, email, fecha_nacimiento, password], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    });
}


const getByEmail = (pEmail) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM usuarios WHERE email = ?', [pEmail], (err, rows) => {
            if (err) return reject(err);
            if (rows.length !== 1) resolve(null);
            resolve(rows[0]);
        });
    });
}

const getById = (pUsuarioId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from usuarios WHERE id = ?', [pUsuarioId], (err, rows) => {
            if (err) return reject(err);
            if (rows.length !== 1) resolve(null);
            resolve(rows[0]);
        });
    })
}


module.exports = { create, getByEmail, getById }

// insert into usuarios(nombre, email, fecha_nacimiento, password, repeat_password)
// VALUES('yeray', 'yeray@gamil.com', '2000-02-02', 'locomundo', 'locomundo')