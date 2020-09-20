const router = require('express').Router();


const apiCervezasRouter = require('./api/cervezas');
const apiUsuariosRouter = require('./api/usuarios');

const favoritasRouter = require('./favoritas');

const { checkToken } = require('./middlewares');


router.use('/cervezas', apiCervezasRouter);
router.use('/usuarios', apiUsuariosRouter);
router.use('/favoritas', checkToken, favoritasRouter);








module.exports = router;