FROM node:alpine
LABEL authors="Angelo Agatino Nicolosi"
WORKDIR /srv/db-stuffms
COPY package*.json ./
RUN npm install --only=production
COPY src/ ./
CMD [ "npm", "start" ]