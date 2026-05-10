const router = require('express').Router();
const { getProductos, getProducto, crearProducto, actualizarProducto, eliminarProducto } = require('../controllers/productos.controller');

router.get('/', getProductos);
router.get('/:id', getProducto);
router.post('/', crearProducto);
router.put('/:id', actualizarProducto);
router.delete('/:id', eliminarProducto);

module.exports = router;