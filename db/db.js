const mongoose = require('mongoose')

mongoose
    //.connect('mongodb://127.0.0.1:27017/database', { useNewUrlParser: true })
    .connect('mongodb://productListUser:productListPassword@127.0.0.1:27017/promotions', { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db