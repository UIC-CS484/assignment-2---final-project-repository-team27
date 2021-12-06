FROM node:16

WORKDIR /usr/src/app

COPY . .
WORKDIR /usr/src/app/mywebsite

RUN npm install

EXPOSE 8080
CMD [ "npm","start"]
