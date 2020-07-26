const mongoose = require('mongoose')
console.log('Estado de la conexión: ', mongoose.connection.readyState)
const db = {
    mongoose,
    connect: async (srv) => {
        const connected = mongoose.connect(srv ? srv : '', { useNewUrlParser: true, useUnifiedTopology: true })
        connected.then(() => {
            console.log('\x1b[32m%s\x1b[0m', 'Conectado a la base de datos\n', srv)
            console.log('Estado de la conexión: ', mongoose.connection.readyState)
            console.log('\x1b[36m%s\x1b[0m', 'Base de Datos:', mongoose.connection.name, `HOST:PORT: ${mongoose.connection.host}:${mongoose.connection.port}\n`)
        }).catch(e => {
            console.log('\x1b[31m%s\x1b[0m', 'Error conectando con MongoDB', e.message)
        })
    },
    disconnect: async () => {
        const disconnected = await mongoose.disconnect()
    }
}

module.exports = db