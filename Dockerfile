FROM node:10-alpine

ARG DB_URL
ENV DB_URL ${DB_URL}
# Crear Directorio de la API
WORKDIR /usr/src/app

# Instalación de dependencias
COPY package*.json ./
RUN npm install

# Copia archivos
COPY . .

# Archivo .env
ADD .env ./
RUN echo ${DB_URL} >> ./.env

# Testing
RUN npm test

EXPOSE 8080

# Inicia servidor de la API
CMD [ "node", "server.js" ]