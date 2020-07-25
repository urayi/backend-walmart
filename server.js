const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config({ path: 'local.env'})
const db = require('./db/db')
const productRouter = require('./routes/products.route')
const app = express()

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 8080

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

console.log(`API para prueba de ingreso a WALLMART`)

// db.on('error', console.error.bind(console, 'Error conectando con MongoDB'))

app.get('/', (req, res) => {
    console.log(`Será redirigido al portal de la aplicación: https://walmart-front.herokuapp.com/`)
    res.redirect('https://walmart-front.herokuapp.com/')
})

app.use('/api', productRouter)

app.listen(port, host, () => console.log("\x1b[32m", `Servidor corriendo en el puerto: ${host}:${port}`))

module.exports = app