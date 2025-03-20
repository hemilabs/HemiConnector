# Hemi Connector

Hemi Connector was developed using Domain-Driven Design (DDD) principles to facilitate interaction with Hemi and external services. This document provides instructions for setting up, running, and contributing to the project.

## Architecture

The code is organized into the following layers:

- Application
- Domain
- Infrastructure
- Presentation

## Application

This layer contains the use cases of the application. It is the entry point for the business logic and it is responsible for coordinating the domain layer and the infrastructure layer (always using dependency injection).

## Domain

This layer contains the business logic of the application. It is the core of the application and it is responsible for the entities and value objects.

## Infrastructure

This layer contains the implementation of the interfaces/repositories. It is responsible for the connections with database and/or other external services.

## Presentation

This layer contains the user interface or the API routes of the application.

## Getting Started

### Prerequisites

- Node.js

### Installation

1. Install the dependencies:

```bash
npm install
```

### Running the Scripts

1. On the root folder, run the following command to start the script that give points to smart contract creation:

```bash
npm run give-points
```

### Running the Tests

To run the tests, you can use the following command:

```bash
npm run test
```

### Lint the Code

```bash
npm run lint
```

### Test the Code Coverage

```bash
npm run test:cov
```

### Environment Variables

The environment variables are defined in the `.env` file. The following variables are used:

- `ABSINTHE_API_URL`: The Absinthe API URL to send requests when giving points
- `ABSINTHE_API_KEY`: The Absinthe API KEY to add to the request headers
- `ABSINTHE_EVENT_NAME`: The Absinthe Event Name to send in the points requests
- `TESTNET`: Boolean value to set if the scripts should run on testnet or no
- `HOURS_INTERVAL`: Interval in hours to search for blocks/transactions that have smart contracts creation
- `METRICS_FILE_PATH`: Path of the Website metrics file (e.g. `/usr/src/app/metrics.json`).

Example of the .env file

```env
ABSINTHE_API_URL=
ABSINTHE_API_KEY=
ABSINTHE_EVENT_NAME=
TESTNET=
HOURS_INTERVAL=
METRICS_FILE_PATH=
```

## Contribution

If you want to contribute to this project and make it better, your help is very welcome.
You can find more information about how to contribute in the [`CONTRIBUTING.md`](https://github.com/hemilabs/.github/blob/main/CONTRIBUTING.md) file.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
