<p align="center"><img src="./assets/icon.png" alt="CoinLizard README Splash Image" width="250" /></p>

# CoinLizard

![GitHub Repo stars](https://img.shields.io/github/stars/genesisxyz/CoinLizard)
![Twitter Follow](https://img.shields.io/twitter/follow/thedummyxyz)

## React Native Cryptocurrency Tracker

This project is a technical challenge to create a React Native application that tracks cryptocurrency prices. The application will fetch and display a list of the top 10 cryptocurrencies by market cap, and allow users to view detailed information about each one.

## Tech Stack

| Library          | Category             | Version | Description                                   |
| ---------------- | -------------------- | ------- | --------------------------------------------- |
| Expo             | SDK                  | v51     | Expo Go and dev client                        |
| TypeScript       | Language             | v5      | Static typechecking                           |
| React Navigation | Navigation           | v6      | Navigation framework                          |
| Gluestack UI     | UI Toolkit           | v1      | Customizable UI components                    |
| Gifted Charts    | Charting Library     | v1      | Charting library for displaying price history |
| Zustand          | State Management     | v4      | State management                              |
| Lingui           | Internationalization | v4      | i18n support                                  |
| AsyncStorage     | Persistence          | v1      | State persistence                             |
| axios            | HTTP client          | v1      | Communicate with CoinGecko API                |
| TanStack Query   | Async data fetching  | v5      | Manage API data fetching and caching          |
| Jest             | Test Runner          | v29     | Test runner for unit tests                    |
| Detox            | Testing Framework    | v20     | End-to-end UI testing                         |
| Husky            | Git Hooks            | v7      | Git hooks for linting                         |

## Quick Start

### Prerequisites

You need to create a `.env.local` file with your [CoinGecko API key](https://docs.coingecko.com/reference/setting-up-your-api-key):

```sh
EXPO_PUBLIC_COINGECKO_API_KEY=your-api-key
```

Xcode and Android Studio are required to run the app on iOS and Android simulators, respectively. Alternatively, the app can be run using the [Expo Go app](https://expo.dev/go).

The recommended way to start the project is by installing the tool [asdf](https://asdf-vm.com/guide/getting-started.html) that will make sure the correct versions of Node.js, Yarn, Ruby and Java are used to build and run the app, then you can `yarn install` and `yarn start` to start the development server.

Otherwise you would need:

- Node.js v18 or greater.
- Yarn v1.22.10 or greater.

If you want to run the app with [Expo dev client](https://docs.expo.dev/versions/latest/sdk/dev-client/) you need:

- iOS:

  - Xcode (tested with v15.4)
  - Cocoa Pods (you can `bundle install`)

- Android:

  - Android Studio (for `adb` and for installing emulators)
  - Java 17

Follow the React Native [Getting Started](https://reactnative.dev/docs/environment-setup) guide to set up your development environment.

## Testing

The project uses Jest for unit tests and Detox for end-to-end tests. To run the tests:

```sh
yarn test
```

Detox tests are not properly tested because of CoinGecko API rate limits. To run the tests refer to the [Detox documentation](https://wix.github.io/Detox/docs/introduction/your-first-test).
