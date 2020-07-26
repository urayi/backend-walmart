const express = require('express')

const ProductCtrl = require('../controllers/products.controller')

const router = express.Router()

router.get('/products', ProductCtrl.getProducts)

router.get('*', (req, res) => {
  console.log(`Será redirigido al portal de la aplicación: https://walmart-front.herokuapp.com/`)
  res.redirect('https://walmart-front.herokuapp.com/')
})

module.exports = router