const Producto = require('../models/Producto');

// GET todos ( con filtro y orden opcionales)
const getProductos = async (req, res) => {
    try {
        const filtro = {};
        if (req.query.tipo) filtro.tipo = req.query.tipo;
        const orden = req.query.orden || 'nombre';
        const productos = await Producto.find(filtro).sort({ [orden]: 1 });
        res.json(productos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET uno por ID
const getProducto = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(producto);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST crear
const crearProducto = async (req, res) => {
    try {
        const producto = await Producto(req.body);
        await producto.save();
        res.status(201).json(producto);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// PUT modificar
const actualizarProducto = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndUpdate(
            req.params.id, req.body, { new: true}
        );
        if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(producto);
    } catch {
        res.status(400).json({ error: err.message });
    }
};

// DELETE eliminar
const eliminarProducto = async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getProductos, getProducto, crearProducto, actualizarProducto, eliminarProducto };