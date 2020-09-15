const router = require('express').Router();
const { getByName, getByPais } = require('../../models/cerveza');

router.get('/:nombre', async (req, res) => {
    // console.log(req.nombre);
    try {
        const cervezas = await getByName(req.params.nombre);
        res.json(cervezas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:pais', async (req, res) => {
    try {
        const cervezasPais = await getByPais(req.params.pais);
        res.json(cervezasPais);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




module.exports = router;