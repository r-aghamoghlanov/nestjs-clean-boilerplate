## Description

Monorepo App following Clean Architecture principles.\
Powered by **TurboRepo**.

## Project setup

```bash
$ npm install -g pnpm
```

```bash
$ pnpm add turbo --global

# Install dependencies for all apps/packages
$ pnpm install

# Install depenencies for specific app/package
$ pnpm install --filter <package OR appName>
```

## Compile and run the project

```bash
# Run monorepo in dev mode
$ turbo dev

# Build all the apps/packages
$ turbo build
# Run monorepo in production
$ turbo prod
```

## Run tests

```bash
# Unit tests
$ turbo test
```

## Docker

**Prerequisites:**
Make sure you have installed following tools on your local machine

- docker
- docker compose

### Local Development

```bash
$ docker compose build

# This will auto-load docker-compose.override.yml for local development
$ docker compose up

# If you want to stop all the running containers
$ docker compose down
```

### Production

```bash
$ docker compose -f docker-compose.yml build
$ docker compose -f docker-compose.yml up
```

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
- [x] Docker
  - [x] Optimized Dockerfiles for services
  - [x] Docker container for running Migrations before running the main app containers
  - [x] Docker compose for easy local development
