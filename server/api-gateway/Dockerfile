FROM node:22.13.0

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm install -g ts-node typescript

EXPOSE 4000

CMD ["ts-node", "server.ts"]
