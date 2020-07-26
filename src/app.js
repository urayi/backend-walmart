const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const db = require('./db/db')
const productRouter = require('./routes/products.route')
const app = express()

db.connect(process.env.DB_URL);

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

console.log('\x1b[36m%s\x1b[0m', `API para prueba de ingreso a WALLMART`)

// db.mongoose.connection.on('error', console.error.bind(console, 'Error conectando con MongoDB'))

app.use('/api', productRouter)

app.get('/', (req, res) => {
    console.log(`Será redirigido al portal de la aplicación: https://walmart-front.herokuapp.com/`)
    res.redirect(302, 'https://walmart-front.herokuapp.com/')
})

app.get('*', (req, res) => {
    console.log(`Será redirigido al portal de la aplicación: https://walmart-front.herokuapp.com/`)
    res.redirect(302, 'https://walmart-front.herokuapp.com/')
})

module.exports = app