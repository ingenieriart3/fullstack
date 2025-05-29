# FROM node:18
# WORKDIR /app
# COPY . .
# RUN npm install -g sails && npm install --legacy-peer-deps
# EXPOSE 3000
# CMD ["sails", "lift"]

FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install -g sails
RUN npm install --legacy-peer-deps

COPY . .

# EXPOSE 3000
ENV NODE_ENV production
CMD ["sails", "lift"]
