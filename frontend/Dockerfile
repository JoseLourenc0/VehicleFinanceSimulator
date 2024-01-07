FROM node:20.9.0-slim AS development

WORKDIR /code

COPY . /code

RUN npm install

CMD [ "npm", "run", "dev" ]

EXPOSE 5173
