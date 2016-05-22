# !!! Check the New Repository !!!

This repository was moved to [starter-react-flux](https://github.com/SokichiFujita/starter-react-flux). Check the new repository!

# react-flux-babel-webpack-eslint-jest

A non-opinionated project generator for React and Flux.

- Setup a well and simply configured React/Flux development environment.
- Facebook's official React toolchains are adopted.
- Generate test scaffolds for Jest from your React components.
- Generate scaffolds for Flux 
  - Dispatcher
  - Action Creator
  - Store :FluxReduceStore
  - Component

## React stack

- [React.js](http://facebook.github.io/react/)
  - React
  - react-dom
  - react-addons-test-utils
  - react-addons-perf
  - react-addons-css-transition-group
- [Flux](https://facebook.github.io/flux/)
  - [flux/utils](https://facebook.github.io/flux/docs/flux-utils.html)
- [Jest](https://facebook.github.io/jest/)
- [Immutable.js](https://facebook.github.io/immutable-js/)
- [Webpack](https://webpack.github.io), [Webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html)
- [Babel](https://babeljs.io)
- [ESLint](http://eslint.org)
  - [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

## Usage

1. Download the `setup.js` of this repository. (This will be improved in the future.)
2. Generate a project and tests.

```
node setup init                         // Setup a new react project.
node setup generate test                // Generate tests from your components.
node setup generate store [StoreName]   // Generate a store file.
```

## Supported npm commands

```
npm start                     // Webpack-dev-server
npm test                      // Jest
npm run lint                  // ESLint
npm run build                 // Build for production
```

## Directory structure

```
.
├── .babelrc
├── .eslintrc
├── __tests__
├── app
│   ├── App.js
│   ├── actions
│   ├── components
│   ├── constants
│   ├── dispatcher
│   └── stores
├── node_modules
├── package.json
├── public
│   ├── css
│   ├── img
│   ├── index.html
│   └── js
└── webpack.config.js
```

## Todo

- [ ] Support for global npm command to make installation easier. (`npm install -g`)
- [x] Add more good toolchains. (e.g. Facebook's Immutable.js)
- [ ] Add 3rd-party libraries (e.g. Material-UI, React-router)
- [ ] Add tests for the generator.
- [ ] Generate tests for stores and actions.
- [ ] Refactoring.

## License

- MIT

