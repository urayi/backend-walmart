const mongoose = require('mongoose')

mongoose
    .connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("\x1b[32m", 'Conectado a la base de datos\n')
        console.log("\x1b[36m", 'Base de Datos:', mongoose.connection.name, `HOST:PORT: ${mongoose.connection.host}:${mongoose.connection.port}\n`)
    })
    .catch(e => {
        console.error('\x1b[31m', 'Error conectando con MongoDB', e.message)
    })

const db = mongoose.connection

module.exports = db