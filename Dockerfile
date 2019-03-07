FROM node:10-alpine
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm install --only=production
COPY ./src/ ./src
COPY ./key.json ./key.json
CMD [ "node", "./src/index.js" ]
