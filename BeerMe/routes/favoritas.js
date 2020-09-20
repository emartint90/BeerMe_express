const { getByFav } = require('../models/cerveza');
// const { getByFav } = require('../models/cerveza');

// const { getById } = require('../models/usuario');
const { checkToken } = require('./middlewares');

const router = require('express').Router();


router.get('/:idCerveza', checkToken, async (req, res) => {

    const result = await getByFav(req.user.id, req.params.idCerveza)
    res.json({ success: 'Cerveza integrada' })



    // console.log(req.user.id);
    // res.send('Petición post para introducir cervezafav del usuario')

    // console.log(req.user);
    // res.json({ success: 'prueba' });
})

module.exports = router;

// router.post('/create', (req, res) => {
//     console.log(req.body);
//     res.send('Petición para la creación de un empleado');
// });