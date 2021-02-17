const express = require('express');
const router = express.Router();
// const multer = require('multer');
// const upload = multer();

const ProductsController = require('../controllers/products.controllers');

router.get('/products', ProductsController.getAll);
router.get('/products/:id', ProductsController.getById);
router.post('/products', ProductsController.post);
router.put('/products/:id', ProductsController.put);
router.delete('/products/:id', ProductsController.delete);

module.exports = router;