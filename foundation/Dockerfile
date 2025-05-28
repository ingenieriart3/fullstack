# Etapa 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Producción
FROM node:18-alpine

ENV NODE_ENV=production
WORKDIR /app

COPY --from=builder /app ./
RUN npm install --omit=dev

EXPOSE 3000
CMD ["npm", "start"]
