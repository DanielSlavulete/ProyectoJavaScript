const Cliente = require('../models/Cliente');

const soloAdmin = async (req, res, next) => {
  const clienteId = req.headers['cliente-id'];
  if (!clienteId) return res.status(401).json({ error: 'No autorizado' });

  const cliente = await Cliente.findById(clienteId);
  if (!cliente || cliente.rol !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado' });
  }

  next();
};

module.exports = soloAdmin;