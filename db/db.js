const mongoose = require('mongoose')

mongoose
    .connect('mongodb://productListUser:productListPassword@127.0.0.1:27017/promotions?authSource=admin&readPreference=primary&ssl=false',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db