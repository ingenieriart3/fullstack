# # # Etapa 1: Build
# FROM node:18-alpine AS builder

# WORKDIR /app

# COPY package.json package-lock.json* ./
# RUN npm install && npm cache clean

# COPY . .
# RUN npm run build

# # Etapa 2: Producción
# FROM node:18-alpine

# ENV NODE_ENV=production
# WORKDIR /app

# COPY --from=builder /app ./
# # RUN npm install --omit=dev
# RUN npm ci--only=production
# RUN npm install && npm cache clean --force --omit=dev

# EXPOSE 3000
# CMD ["npm", "start"]

# # # Stage 1: Build
# # FROM node:18-alpine AS builder
# # # FROM node:18-slim AS builder

# # WORKDIR /app

# # # Copy only package files first (better layer caching)
# # COPY package.json package-lock.json ./

# # # Install dependencies (including devDependencies for build)
# # RUN npm install --force && \
# #     npm cache clean --force

# # # Copy the rest and build
# # COPY . .
# # RUN npm run build

# # # Stage 2: Production
# # FROM node:18-alpine

# # ENV NODE_ENV=production
# # WORKDIR /app

# # # Copy only production files from builder
# # COPY --from=builder /app/package.json /app/package-lock.json ./
# # COPY --from=builder /app/node_modules ./node_modules
# # COPY --from=builder /app/dist ./dist  
# # # (or wherever your build outputs)

# # # Optional: Prune dev dependencies if needed
# # # RUN npm prune --production

# # EXPOSE 3000
# # CMD ["npm", "start"]

# Usa la imagen oficial de Node.js como base
FROM node:18-alpine

# Establecer el directorio de trabajo en /app
WORKDIR /app

# Copiar el package.json y package-lock.json (si existe) primero para aprovechar el cache de Docker y evitar re-instalar dependencias innecesarias
COPY package.json package-lock.json ./

# Instalar las dependencias
RUN npm install --legacy-peer-deps

# Copiar todo el código de la aplicación al contenedor
COPY . .

# Construir la aplicación de Next.js
RUN npm run build

# Exponer el puerto en el que Next.js va a escuchar
EXPOSE 3000

# Comando para iniciar la aplicación Next.js
CMD ["npm", "start"]
