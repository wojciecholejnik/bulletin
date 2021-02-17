const Products = require('../models/products.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Products.find().populate());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const prod = await Products.findById(req.params.id).populate();
    if(!prod) res.status(404).json({ message: 'Not found' });
    else res.json(prod);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { title, content, publishDate, lastUpdate, status, photo, price, phone, location, email, name} = req.fields;
    const file = req.files.photo;
    const fileName = file.path.split('/').slice(-1)[0];
    
    const newProducts = new Products({ 
      title: title, 
      content: content, 
      publishDate: publishDate,
      lastUpdate: lastUpdate,
      status: status,
      price: price,
      phone: phone,
      photo: fileName,
      location: location,
      email: email,
      name: name,
    });
    await newProducts.save();
    
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  const { title, content, lastUpdate, status, price, phone, photo, location} = req.body;
  try {
    const prod = await(Products.findById(req.params.id));
    if(prod) {
      await Products.updateOne({ _id: req.params.id }, { $set: { 
        title: title,  
        content: content, 
        lastUpdate: lastUpdate,
        status: status,
        price: price,
        phone: phone,
        photo: photo,
        location: location,
      }});
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const prod = await(Products.findById(req.params.id));
    if(prod) {
      await Products.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};