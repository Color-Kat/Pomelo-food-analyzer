FROM node:23-alpine as build

WORKDIR /app

COPY *.json ./

RUN npm install

COPY . .

RUN npm run build api-gateway # Will create folder in ./dist/apps/api-gateway

FROM node:23-alpine

WORKDIR /app

COPY package.json ./

RUN npm install --only=prod

COPY --from=build /app/dist/apps/api-gateway ./dist

CMD ["node", "./dist/main.js"]