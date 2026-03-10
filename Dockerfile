FROM node:20-alpine

# 1. On installe openssl1.1-compat pour corriger l'erreur libssl
RUN apk add --no-cache openssl

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

# 2. On force Prisma à générer le client pour l'architecture Alpine (musl)
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start:dev"]