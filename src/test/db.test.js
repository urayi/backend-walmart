const db = require('../db/db')

jest.setTimeout(10000);
describe('Test de conexión de la base de datos', () => {

  /* beforeEach(async () => {
    if (db.mongoose.connection.readyState > 0) {
      await db.disconnect()
    }
  }) */

  afterAll(async (done) => {
    if (db.mongoose.connection.readyState > 0) {
      await db.disconnect()
      done()
    }
  })

  test('Debería conectar a la base de datos', () => {
    if (db.mongoose.connection.readyState === 0) {
      db.connect(process.env.DB_URL).then(async () => {
        await expect(db.mongoose.connection.readyState).toBe(1)
      })
    } else {
      expect(db.mongoose.connection.readyState).toBe(1)
    }
  })

  test('Debería desconectar la base de datos', async () => {
    db.disconnect().finally(() => {
      expect(db.mongoose.connection.readyState).toBe(0)
    })
  })

  test('Debería fallar al conectar a la base de datos', () => {
    db.connect('').finally(() => {
      expect(db.mongoose.connection.readyState).toBe(0)
    })
  })

})