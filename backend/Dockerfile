FROM node:20.9.0-alpine AS development

WORKDIR /code

COPY . /code
COPY .env_example /code/.env

RUN npm install

CMD ["npm", "run", "dev"]

EXPOSE 3000
