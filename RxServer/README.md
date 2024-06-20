# RX API 

This repository provides a default configuration to quickly start TypeScript projects with ES Modules. It comes with minimal Prettier, ESLint, and test configurations, along with features like automatic server restart, environment variables support, debug mode, and Git hooks. Additionally, it provides VSCode extensions and settings recommendations.

## Installation

1. Navigate to the project directory: `cd RxServer`
2. Install the dependencies: `npm install`
3. Rename: `.env.dev` to `.env`

## Usage

- `npm start`: Start the application.
- `npm run build`: Compile TypeScript code into the `dist` folder.
- `npm run dev`: Start the application in development mode with automatic restart, debug mode, and environment variables loaded from `.env`.
- `npm test`: Run the test suite with loaded environment variables from `.env`
- `npm run test:coverage`: Run the test suite with code coverage analysis.
- `npm run lint`: Run Prettier to check code formatting and ESLint for static code analysis.
- `npm run format`: Automatically format the code with Prettier.
- `npm run typecheck`: Run TypeScript type checking.
- `npm run prepare`: Install Husky Git hooks.
