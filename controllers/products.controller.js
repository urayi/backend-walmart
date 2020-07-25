const Product = require('../models/product.model');

const getProducts = async (req, res) => {

  let search = req.query.query ? req.query.query.toString().toLowerCase() : null;
  let discount = 50;
  let query = search && !/[.!\[\]|$\^()\?{}*+<>]/g.test(search) ? new RegExp("^(.*?(" + search + ")[^$]*)$", 'i') : null;
  let promotions = [];

  console.log('Hay Query:', Number(search) ? Number(search) : null, Number(search) ? null : query, Number(search) ? null : query);

  await Product.find({
    $or: [
      { id: Number(search) ? Number(search) : null },
      { brand: Number(search) ? null : query },
      { description: Number(search) ? null : query }
    ]
  }, (err, products) => {
    if (err) {
      error.status
      return res.status(500).json({ success: false, error: err })
    }
    if (!products.length) {
      return res.status(200).json({ success: false, error: `No se encontraron Productos` })
    }
    if (search === search.split('').reverse().join('') && (Number(search) || search.length > 3)) {
      console.log('Los precios de los productos tendrán 50% de descuento');
      promotions = products.map(item => {
        item.price *= (discount / 100)
        return item
      });
      return res.status(200).json({ success: true, isPromotion: true, data: promotions })
    } else {
      return res.status(200).json({ success: true, isPromotion: false, data: products })
    }
  }).catch(err => console.log(err))
}

module.exports = { getProducts, }