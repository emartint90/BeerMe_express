const router = require('express').Router();
const { check, validationResult } = require('express-validator');

const { getByName, getByPais, createCerveza, getByNameUnique } = require('../../models/cerveza');

router.get('/:nombre', async (req, res) => {
    try {
        console.log(req.params.nombre);
        const cervezas = await getByName(req.params.nombre);
        res.json(cervezas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:pais', async (req, res) => {
    try {
        console.log(req.params.pais);
        const cervezasPais = await getByPais(req.params.pais);
        res.json(cervezasPais);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/registroCerveza',
    [
        // check('nombre', 'Ya has registrado la cerveza, pon otra!').exits(), notEmpty()
        // , check('cervecera', 'No hace falta que pongas la compañia, nosotras actualiz')

    ],
    async (req, res) => {
        try {
            const cervezas = await getByNameUnique(req.params.nombre);
            console.log(cervezas);
            if (!cervezas) {
                res.json(cervezas);
                //res.json({ error: "La cerveza ya existe" });
            } else {
                const newCerveza = await createCerveza(req.body);
                res.json(newCerveza);
            }
        } catch {
            res.status(500).json({ error: 'No se registra la cerveza' })
        }
    });




module.exports = router;