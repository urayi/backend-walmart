
const app = require('./app');
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 8080

app.listen(port, host, () => console.log('\x1b[32m%s\x1b[0m', `Servidor corriendo en el puerto: ${host}:${port}`))

module.exports = app