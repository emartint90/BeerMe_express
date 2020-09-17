const dbConfig = require("../dbConfig");

const create = ({ nombre, email, fecha_nacimiento, password, repeat_password }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO usuarios (nombre, email, fecha_nacimiento, password, repeat_password) values (?, ?, ?, ?, ?)', [nombre, email, fecha_nacimiento, password, repeat_password], (err, result) => {
            if (err)
                return reject(err);
            resolve(result);
        })
    });
}


const getByEmail = ({ email, password }) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM usuarios WHERE email = ?) values ( ?, ?)', [email, password], (err, result) => {
            if (err)
                return reject(err);
            resolve(result);
        })
    });
}


module.exports = { create }

// insert into usuarios(nombre, email, fecha_nacimiento, password, repeat_password)
// VALUES('yeray', 'yeray@gamil.com', '2000-02-02', 'locomundo', 'locomundo')