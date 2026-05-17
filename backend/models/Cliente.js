const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombre:   { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  telefono: { type: String },
  password: { type: String, required: true },
  rol: { type: String, default: 'usuario', enum: ['usuario', 'admin'] }
});

module.exports = mongoose.model('Cliente', clienteSchema);
