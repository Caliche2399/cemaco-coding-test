FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install --verbose

COPY . .

EXPOSE 3000

CMD ["node", "backend.js"]
