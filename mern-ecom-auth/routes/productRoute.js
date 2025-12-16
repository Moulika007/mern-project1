const express = require('express');
const router = express.Router();
const { getProducts, setProduct, getProductById, adoptPet } = require('../controller/productController');

router.route('/').get(getProducts).post(setProduct);
router.route('/:id').get(getProductById);
router.route('/:id/adopt').put(adoptPet); // New Route for Buying

module.exports = router;