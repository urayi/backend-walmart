const db = require('../db/db')

jest.setTimeout(60000);
describe('Test de conexión de la base de datos', () => {

  beforeEach(() => {
    if (db.mongoose.connection.readyState > 0) {
      db.disconnect()
    }
  })

  afterAll(() => {
    if (db.mongoose.connection.readyState > 0) {
      db.disconnect()
    }
  }) 

  test('Debería conectar a la base de datos', () => {
    if (db.mongoose.connection.readyState === 0) {
      db.connect(process.env.DB_URL).finally(()=>{
        expect(db.mongoose.connection.readyState).toBe(2)
      })
    } else {
      expect(db.mongoose.connection.readyState).toBe(1)
    }
  })

  test('Debería desconectar la base de datos', () => {
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