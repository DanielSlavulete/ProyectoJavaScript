const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombre:   { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  telefono: { type: String },
  password: { type: String, required: true }
});

module.exports = mongoose.model('Cliente', clienteSchema);
