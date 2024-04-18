<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>
# Project Framework


Invoices management Backend part built using:
- Nestjs http://nestjs.com/
- Graphql for writing queries and mutations
- typeorm used to communitcate with the mysql2 database
-argon2 was used and provides better and more secure hashing mechanism than bcrypt
-handled cors for better security
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# Project Structure
The project main directories are: middleware and auth,and resource folder for invoice management

The queries were written in resolvers which communicates with services to get the data, so we have the services handling the logic and then returning the result to the resolvers
## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
