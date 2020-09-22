const { getByFav, cervezasFav, deleteFav } = require('../models/cerveza');


// const { getById } = require('../models/usuario');
const { checkToken } = require('./middlewares');

const router = require('express').Router();

//Ruta para recuperar las cervezas favoritas del usuario
router.get('/beerlist', checkToken, async (req, res) => {
    const result = await cervezasFav(req.user.id);
    res.json(result)
})


//Ruta para eliminar la cerveza de la lista de favoritos
router.get('/beerlist/delete/:idCerveza', checkToken, async (req, res) => {
    const result = await deleteFav(req.user.id, req.params.idCerveza);
    res.json({ success: 'Cerveza eliminada' })
})

//Ruta para saber si la cerveza está en la lista de favoritos
// router.get('/beerlist/comprobacion/:idCerveza', checkToken, async (req, res) => {
//     const result = await getFav(req.user.id, req.params.idCerveza);
//     console.log(result);
//     if (err) return reject(err);
//     if (rows.length == 0) resolve(null);
//     resolve(rows);
// if (!result) return res.json({ success: 'Ceveza aún no es favorita' });
// return res.json({ warning: 'Cerveza ya en sus favoritos' });
// })

//Ruta para introducir la cerveza en la lista de favoritos
router.get('/:idCerveza', checkToken, async (req, res) => {
    // console.log('entra');

    const result = await getByFav(req.user.id, req.params.idCerveza)
    res.json({ success: 'Cerveza integrada' })

})


module.exports = router;