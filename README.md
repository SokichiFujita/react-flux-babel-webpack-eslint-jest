# react-flux-babel-webpack-eslint-jest

A non-opinionated project generator for React and Flux.

- Provide well and simply configured React/Flux development environment.
- Keep the project clean. This generator doesn't leave own traces in the generated project.
- Facebook's official React toolchains are adopted.
- Generate test scaffolds for Jest from your React components.

## React stack

- [React](http://facebook.github.io/react/)
  - React
  - react-dom
  - react-addons-test-utils
  - react-addons-perf
  - react-addons-css-transition-group
- [Flux](https://facebook.github.io/flux/)
  - [flux/utils](https://facebook.github.io/flux/docs/flux-utils.html)
- [Jest](https://facebook.github.io/jest/)
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

## Directory structure of the generated project

```
.
├── __tests__
├── app
│   ├── App.js
│   ├── actions
│   ├── components
│   ├── dispatchers
│   └── stores
├── node_modules
├── package.json
├── public
├── package.json
├── public
│   ├── css
│   ├── img
│   ├── index.html
│   └── js
├── setup.js
└── webpack.config.js
```

## Todo

- Support for global npm command to make installation easier. (`npm install -g`)
- Add more good toolchains. (e.g. Facebook's Immutable.js)
- [Under review] Add 3rd-party libraries (e.g. Material-UI, React-router)
- Add tests for the generator.
- Refactoring.

## License

- MIT

