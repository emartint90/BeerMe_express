const router = require('express').Router();
const { getByName } = require('../../models/cervezas');

router.get('/', async (req, res) => {
    // console.log(req.nombre);
    try {
        const cervezas = await getByName();
        res.json(cervezas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


















module.exports = router;