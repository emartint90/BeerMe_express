const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { create } = require('../../models/usuario');


router.post('/registro', [
    check('nombre', 'El campo nombre es obligatorio').notEmpty(),
    check('email', 'El campo email es obligatorio').exists().isEmail(),
    check('fecha_nacimiento', 'El campo fecha de nacimiento es obligatorio').notEmpty(),
    check('password', 'Introduce una contraseña').notEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(errors.array());
    }

    req.body.password = bcrypt.hashSync(req.body.password, 10);

    await create(req.body);
    res.json({ success: 'Welcome to BeerMe Community' });

});

router.post('/login', [
    check('email', 'Debes introducir tu email').exists().isEmail().notEmpty(),
    check('password', 'El campo contraseña es obligarotio').exists().notEmpty(),],

    async (req, res) => {
        //confirmar que no hay errores en el login
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.json(errors.array());

        //creamos una constante usuario para almacenar la fila del usuario a través del email

        const usuario = await getByEmail(req.body.email)

        //el if global supone que el email existe y valida la contraseña. else si el email no existe.

        if (usuario) {
            const iguales = bcrypt.compareSync(req.body.password, usuario.password);
            if (iguales) {
                res.json({ success: 'Login.OK!', token: createToken(usuario) });
            } else {
                res.json({ error: '¡ERROR! Se ha producido un error en su intento de inicio de sesión. Asegúrese de que el nombre de usuario y la contraseña son correctos.' })
            }
        } else {
            res.json({ error: 'El email/password son incorrectos' })
        }

    });

const createToken = (pUsuario) => {

    const payload = {
        todayDate: new Date,
        usuarioId: pUsuario.id,
        createdAt: moment().unix(),
        expiredAt: Math.floor(Date.todayDate() / 1000) + (60 * 60),
    }
    return jwt.sign(payload);

}












module.exports = router;