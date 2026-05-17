const router = require('express').Router();
const { getProductos, getProducto, crearProducto, actualizarProducto, eliminarProducto } = require('../controllers/productos.controller');
const soloAdmin = require('../middlewares/admin');

router.get('/', getProductos);
router.get('/:id', getProducto);
router.post('/', soloAdmin, crearProducto);
router.put('/:id', soloAdmin, actualizarProducto);
router.delete('/:id', soloAdmin, eliminarProducto);

module.exports = router;