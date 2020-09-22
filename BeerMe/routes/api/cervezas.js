const router = require('express').Router();
const { check, validationResult } = require('express-validator');

const { getByName, getByPais, createCerveza, getByNameUnique, paises } = require('../../models/cerveza');

router.get('/:nombre', async (req, res) => {
    try {
        console.log(req.params.nombre);
        const cervezas = await getByName(req.params.nombre);
        res.json(cervezas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/pais/:pais', async (req, res) => {
    try {
        console.log(req.params.pais);
        const cervezasPais = await getByPais(req.params.pais);
        res.json(cervezasPais);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/buscaPaises', async (req, res) => {
    try {
        const paises = await paises();
        console.log(paises);
        res.json(paises);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/registroCerveza',
    async (req, res) => {
        try {
            const cervezas = await getByNameUnique(req.body.nombre);
            console.log(cervezas);
            if (cervezas.length !== 0) {
                // res.json(cervezas);
                res.json({ error: "La cerveza ya existe" });
            } else {
                const newCerveza = await createCerveza(req.body);
                // res.json(newCerveza);
                res.json({ success: 'Cerveza integrada' })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'No se registra la cerveza' })
        }
    });






module.exports = router;