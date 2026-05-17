const Cliente = require('../models/Cliente');

// GET todos
const getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET uno por ID
const getCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);
        if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
        res.json(cliente);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// PUT modificar
const actualizarCliente = async (req, res) => {
    try {
        const { rol, password, ...datosActualizables } = req.body; // extraemos rol y password para excluirlos de la modificación
        const cliente = await Cliente.findByIdAndUpdate(
            req.params.id, req.body, { new: true }
        );
        if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
        res.json(cliente);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE eliminar
const eliminarCliente = async (req, res) => {
    try {
        await Cliente.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Cliente eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getClientes, getCliente, actualizarCliente, eliminarCliente };