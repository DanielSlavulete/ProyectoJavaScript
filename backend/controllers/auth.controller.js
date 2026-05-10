const Cliente = require('../models/Cliente');
const bcrypt = require('bcryptjs');

// POST registro
const registro = async (req, res) => {
    try {
        const { nombre, email, telefono, password } = req.body;

        // Comprobamos si el email ya existe
        const existe = await Cliente.findOne({ email });
        if (existe) return res.status(400).json({ error: 'El email ya está registrado'});

        // Hasheamos la contraseña antes de guardarla
        const hash = await bcrypt.hash(password, 10);

        const cliente = new Cliente({ nombre, email, telefono, password: hash });
        await cliente.save();

        res.status(201).json({ mensaje: 'Cliente registrado correctamente' });
    } catch {
        res.status(400).json({ error: err.message });
    }
};

// POST login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscamos el cliente por email
        const cliente = await Cliente.findOne({ email });
        if (!cliente) return res.status(401).json({ error: 'Credenciales incorrectas' });

        // Comparamos la contraseña con el hash guardado
        const ok = await bcrypt.compare(password, cliente.password);
        if (!ok) return res.status(401).json({ error: 'Credenciales incorrectas' });

        res.json({ mensaje: 'Login correcto', clienteId: cliente._id, nombre: cliente.nombre });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { registro, login };