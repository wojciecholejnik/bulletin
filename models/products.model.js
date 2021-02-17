const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
  title: { type: String, required: false },
  content: { type: String, required: false },
  publishDate: { type: String, required: false },
  lastUpdate: { type: String, required: false },
  status: { type: String, required: false },
  phone: { type: String, required: false },
  location: { type: String, required: false },
  photo: { type: String, required: false },
  price: { type: String, required: false },
  email: {type: String, required: false},
  name: {type: String, required: false},
});

module.exports = mongoose.model('Product', productsSchema);