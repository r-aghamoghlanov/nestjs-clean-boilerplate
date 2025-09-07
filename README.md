## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Features

- [x] Clear separation between Application & Domain & Infrastructure Layers
- [x] Agnostic Database Layer
  - [] Transactional Wrapper
  - [x] TypeORM integration
    - [x] TypeORM Main Configuration
    - [x] TypeORM Migration Configuration
- [x] Agnostic Cache Module
  - [x] Redis Cache Integration
  - [x] Basic In-Memory Cache as an Example
- [x] Agnostic Unified Logging
  - [x] Pino Logger integration
- [x] Unified Error Handling
  - [x] Localization
  - [x] Custom Exception Filters
- [x] Env Configuration
- [x] Zod validation + OpenAPI (Swagger) integration
- [ ] File Upload & File Download
- [ ] Agnostic Cron Jobs & Batch Jobs Processing Module
  - [ ] BullMQ integration
- [ ] Agnostic Mailer Module
  - [ ] Nodemailer integration

### MonoRepo Config

- [x] Turborepo for controlling monorepo
- [x] Eslint config
- [x] Typescript config
- [x] Apps workspace with worker & API boilerplates
- [x] Core layer as a separate workspace
- [x] Compiled (buildable) Internal Packages
  - [x] Reusable typescript as package
  - [x] Reusable eslint config as package
  - [x] Infrastructure layer as package
