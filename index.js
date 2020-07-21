const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db/db')

const productRouter = require('./routes/products.route')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', productRouter)

app.listen(port, () => console.log(`Servidor corriendo en el puerto: ${port}`))