FROM node:10-alpine

# Crear Directorio de la API
WORKDIR /usr/src/app

# Instalación de dependencias
COPY package*.json ./
RUN npm install

# Copia archivos
COPY . .

EXPOSE 8080

# Inicia servidor de la API
CMD [ "node", "server.js" ]