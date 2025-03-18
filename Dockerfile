# Etap 1 - Budowanie aplikacji Angular
FROM node:22.12.0 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Etap 2 - Serwowanie aplikacji
FROM node:22.12.0-alpine

WORKDIR /app

COPY --from=build /app/dist/gosqu-web/browser ./dist

RUN npm install -g serve

CMD ["serve", "-s", "dist", "-l", "3000"]
