FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

ENV DATABASE_IP=$DATABASE_IP

CMD ["npm", "start"]