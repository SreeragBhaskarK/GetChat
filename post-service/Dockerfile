FROM node:19.9
WORKDIR /app
COPY package*.json ./ 
RUN npm install
COPY . .
EXPOSE 3002
CMD ["npm","start"]