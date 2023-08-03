FROM node:19.9.0
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm","start"]