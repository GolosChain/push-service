FROM node:8
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm install --only=production
COPY ./src/ ./src
COPY ./key.json ./key.json
CMD [ "node", "./src/Main.js" ]
