const express = require('express')

const ProductCtrl = require('../controllers/products.controller')

const router = express.Router()

router.get('/products', ProductCtrl.getProducts)

module.exports = router