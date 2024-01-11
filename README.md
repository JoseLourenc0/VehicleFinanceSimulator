# Instructions

The project is structured as follows:

- [Backend](#backend)
- [Frontend](#frontend)

Below is a detailed explanation of each.

You can jump directly to local development instructions [here](#development)

## Backend

The Backend is the application's API responsible for managing the data needed for the frontend, allowing it to consume and apply the defined business rules.

The main technologies used are:

- [Node](https://nodejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Knex](https://knexjs.org/)
- [Vitest](https://vitest.dev/)

## Frontend

The Frontend is where the client will access to abstractly consume the methods provided by the Application's Backend to achieve the defined objectives.

The Frontend has the default client route that performs a simulation ('/' and '/discover'), and a screen for managing and querying registered data ('/app'), including an authentication screen and features limited to users logged into the system.

The main technologies used are:

- [Node](https://nodejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)

# Development

To start the containers locally, simply run the following command:

```
docker-compose up -d
```

To configure the database, you will need to access the backend project (either by accessing via container or in the folder navigation itself):

```
docker-compose exec backend sh
```

To run the migration command for creating tables, just run the command:

```
npm run migrate
```

To create some prepared data, such as a root user for access + some pre-registered vehicles, just run:

```
npm run seed
```

The default user for access is:

- user: root

- pass: S3CUR3_P455W0RD
