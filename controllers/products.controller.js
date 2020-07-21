const Product = require('../models/product.model');
const { query } = require('express');

getProducts = async (req, res) => {
  console.log(req.query, req.params);
  var query = require('url').parse(req.url, true).query;
  await Product.find({
    /* id: req.query !== {} ? req.query.query : null, */
    brand: req.query !== {} ? req.query.query : null,
    description: req.query !== {} ? req.query.query : null,
  }, (err, products) => {
    console.log(req.query.query);
    if (err) {
      return res.status(500).json({ success: false, error: err })
    }
    if (!products.length) {
      return res.status(404).json({ success: false, error: `No se encontraron Productos` })
    }
    if (req.query.query) {
      return res.status(200).json({ success: true, data: products })
    }
    return res.status(200).json({ success: true, data: products })
  }).catch(err => console.log(err))
}

module.exports = {
  getProducts,
}