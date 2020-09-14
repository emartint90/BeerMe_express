const router = require('express').Router();


const apiCervezasRouter = require('./api/cervezas');


router.use('/cervezas', apiCervezasRouter);







module.exports = router;