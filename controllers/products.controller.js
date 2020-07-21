const Product = require('../models/product.model')

getProducts = async (req, res) => {
  await Product.find({}, (err, products) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
      if (!products.length) {
          return res
              .status(404)
              .json({ success: false, error: `No se encontraron Productos` })
      }
      return res.status(200).json({ success: true, data: products })
  }).catch(err => console.log(err))
}

module.exports = {
  getProducts,
}