const router = require('express').Router();
const { getClientes, getCliente, actualizarCliente, eliminarCliente } = require('../controllers/clientes.controller');

router.get('/', getClientes);
router.get('/:id', getCliente);
router.put('/:id', actualizarCliente);
router.delete('/:id', eliminarCliente);

module.exports = router;