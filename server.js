const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db/db')

console.log(db);

const productRouter = require('./routes/products.route')

const app = express()
const port = 8080

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'Error conectando con MongoDB'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', productRouter)

app.listen(port, () => console.log(`Servidor corriendo en el puerto: ${port}`))