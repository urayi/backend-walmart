FROM node:10

# Create app directory
WORKDIR /usr/src/app

# CMD make database-up
# Install app dependencies
COPY package*.json ./
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]