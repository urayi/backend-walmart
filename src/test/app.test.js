const request = require('supertest')
const app = require('../app')
const db = require('../db/db')

jest.setTimeout(30000);
describe('Test de endpoints de la aplicación', () => {

  beforeAll(() => {
    db.connect(process.env.DB_URL)
  })

  afterAll(async () => {
    db.disconnect()
  })

  test('Llamado a la raiz del servidor, redirige al front', () => {
    return request(app).get('/').expect(302).then(response => {
      expect(response.header.location).toBe('https://walmart-front.herokuapp.com/')
    })
  })

  test('Llamado a la raiz de las API, redirige al front', () => {
    return request(app).get('/api').expect(302).then(response => {
      expect(response.header.location).toBe('https://walmart-front.herokuapp.com/')
    })
  })

  test('Llamado a una ruta inexistente, redirige al front', () => {
    return request(app).get('/kjdsgfjkadsbfnadsjfkja').expect(302).then(response => {
      expect(response.header.location).toBe('https://walmart-front.herokuapp.com/')
    })
  })

  test('No debería mostrar productos porque no tiene query de busqueda', async (done) => {
    return request(app)
      .get('/api/products')
      .expect(202)
      .then(response => {
        expect(response.body.error).toBe('No se encontraron Productos')
        expect(response.body.data).toBe(undefined)
        done()
      });
  })

  test('No debería mostrar productos porque la query esta vacía', async (done) => {
    return request(app)
      .get('/api/products').query({ query: '' })
      .expect(202)
      .then(response => {
        expect(response.body.error).toBe('No se encontraron Productos')
        expect(response.body.data).toBe(undefined)
        done()
      });
  })

  test('No debería mostrar productos porque no existen coincidencias', async (done) => {
    return request(app)
      .get('/api/products').query({ query: 'vkjsdvjdasdasd nmnnmxcnm' })
      .expect(202)
      .then(response => {
        expect(response.body.error).toBe('No se encontraron Productos')
        expect(response.body.data).toBe(undefined)
        done()
      });
  })

  test('Búsqueda por codigo de producto palíndromo', async (done) => {
    return request(app)
      .get('/api/products').query({ query: 181 })
      .expect(200)
      .then(response => {
        expect(response.body.isPromotion).toBe(true)
        done()
      });
  })

  test('Búsqueda por codigo de producto que no es un palíndromo', async (done) => {
    return request(app)
      .get('/api/products').query({ query: 181 })
      .expect(200)
      .then(response => {
        expect(response.body.isPromotion).toBe(true)
        done()
      });
  })

  test('Busqueda por palabra que es un palíndromo contenida en brand o description', async (done) => {
    return request(app)
      .get('/api/products').query({ query: 'asdsa' })
      .expect(200)
      .then(response => {
        expect(response.body.isPromotion).toBe(true)
        done()
      });
  })

  test('Busqueda por palabra que NO es un palíndromo contenida en brand o description', async (done) => {
    return request(app)
      .get('/api/products').query({ query: 'asds' })
      .expect(200)
      .then(response => {
        expect(response.body.isPromotion).toBe(false)
        done()
      });
  })

  test('Busqueda por palabra de hasta 3 carácteres contenida en brand o description', async (done) => {
    return request(app)
      .get('/api/products').query({ query: 'jos' })
      .expect(200)
      .then(response => {
        expect(response.body.isPromotion).toBe(false)
        done()
      });
  })

})