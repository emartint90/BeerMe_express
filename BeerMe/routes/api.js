const router = require('express').Router();


const apiCervezasRouter = require('./api/cervezas');
const apiUsuariosRouter = require('./api/usuarios');


router.use('/cervezas', apiCervezasRouter);
router.use('/usuarios', apiUsuariosRouter);







module.exports = router;