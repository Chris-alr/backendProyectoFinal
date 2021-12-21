const express = require('express');
const router = express.Router();
const APIX = require('../controllers/apiUser');



router.post('/', APIX.crearUsuario);


module.exports = router;