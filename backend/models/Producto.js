const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre:           { type: String, required: true },
  descripcion:      { type: String, required: true },
  imagen:           { type: String },
  precio:           { type: Number, required: true },
  tipo:             { type: String, required: true },
  especificaciones: { type: Object, default: {} },
  descuento:        { type: Number, default: 0 },
  urlVideo: { type: String, default: '' }
});

module.exports = mongoose.model('Producto', productoSchema);
