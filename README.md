# Desafío Walmart

### Installation

Se requiere tener instalado NodeJS y NPM

Para levantar el sistema de debe ejecutar
```sh
$ npm install && npm start
```

Para ejecutar los test unitarios y verificar la covertura
```sh
$ npm test -- --coverage
```

### API

Para consultar el servicio se usa el suguiente comando
```sh
$ curl --request GET '{API_URL}/api/products?query={SEARCH_WORD}'
```

Donde API_URL es la url base del servidor del servicio y SEARCH_WORD la palabra a buscar