const router = require('express').Router();
const { registro, login } = require('../controllers/auth.controller');

router.post('/registro', registro);
router.post('/login', login);

module.exports = router;