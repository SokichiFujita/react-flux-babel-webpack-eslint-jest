var util = require('util');
var exec = require('child_process').execSync;
var fs = require('fs');

var dirs = [
  //Flux
  './app',
  './app/actions',
  './app/components',
  './app/dispatchers',
  './app/stores',

  //Build
  './public',
  './public/css',
  './public/img',
  './public/js',
  
  //Jest
  './__tests__'
]

var npms = [
  //Babel
  'npm install --save-dev babel-cli',
  'npm install --save-dev babel-preset-es2015',
  'npm install --save-dev babel-preset-react',

  //React
  'npm install --save-dev react',
  'npm install --save-dev react-dom',
  'npm install --save-dev react-addons-css-transition-group',
  'npm install --save-dev react-addons-test-utils',
  'npm install --save-dev react-addons-perf',

  //Flux
  'npm install --save-dev flux',

  //Jest
  'npm install --save-dev jest-cli',
  'npm install --save-dev babel-jest',
  'npm install --save-dev babel-polyfill',

  //WebPack
  'npm install --save-dev webpack',
  'npm install --save-dev webpack-dev-server',
  'npm install --save-dev babel-loader',

  //ESLint
  'npm install --save-dev eslint',
  'npm install --save-dev eslint-plugin-import',
  'npm install --save-dev eslint-plugin-react',
  'npm install --save-dev eslint-plugin-jsx-a11y',
  'npm install --save-dev eslint-config-airbnb'
]

var repository = {
  'type':'git', 
  'url':'https://example.com'
};

var jest = {
  'unmockedModulePathPatterns': [
    '<rootDir>/node_modules/react',
    '<rootDir>/node_modules/react-dom',
    '<rootDir>/node_modules/react-addons-test-utils'
  ]
};

var scripts = {
  'start': 'webpack-dev-server -d --progress --colors',
  'build': 'NODE_ENV=production node_modules/.bin/webpack -p --progress --colors',
  'test': 'jest',
  'lint': 'eslint app/**'
};

var eslint = {
    "extends": "airbnb",
    "plugins": [
        "react"
    ]
}

var webpackConfig = 
`var webpack = require('webpack');

var config = {
  devtool: 'inline-source-map',
  entry:  __dirname + "/app/App.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015','react']
      }
    }]
  },
  devServer: {
    contentBase: "./public",
    colors: true,
    historyApiFallback: true,
    inline: true
  },
}

if (process.env.NODE_ENV === 'production') {
  config.devtool = false;
  config.plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({comments: false}),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')}
    })
  ];
};

module.exports = config;`;

var indexHTML = 
`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title></title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <div id='root'>
    </div>
    <script src="bundle.js"></script>
  </body>
</html>`;

var appJS = 
`import React, { Component } from 'react';
import { render } from 'react-dom';
import { Container } from 'flux/utils';
import Sample from './components/Sample';

class App extends Component {
  static getStores() {
    return [];
  }

  static calculateState() {
    return null;
  }

  componentDidMount() {
  }

  render() {
    return (
      <Sample title="World" />
    );
  }
}

const AppContainer = Container.create(App);
render(<AppContainer />, document.getElementById('root'));
`;

var componentSample =
`import React from 'react';

const Sample = (props) => (
  <div>
    <h1>Hello</h1>
    <p>{props.title}</p>
  </div>
);

Sample.propTypes = {
  title: React.PropTypes.string.isRequired,
};

export default Sample;
`;

var sampleTest =
`jest.unmock('../app/components/Sample');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Sample from '../app/components/Sample'

describe('<Sample />', () => {
  it('displays "Hello World"', () => {
    const app = TestUtils.renderIntoDocument(
      <div>
        <Sample title="World" />
      </div>
    );
    const appNode = ReactDOM.findDOMNode(app);
    expect(appNode.textContent).toEqual('HelloWorld');
  });
});
`;


setupReact();

function setupReact() {

  createDirectories(dirs);
  
  exec('npm init -y', puts);
  
  fixJSON('package.json', 'description', 'React template.');
  fixJSON('package.json', 'repository', repository);
  fixJSON('package.json', 'jest', jest); 
  fixJSON('package.json', 'scripts', scripts); 
  
  createJSON('.eslintrc', eslint);
  createJSON('.babelrc', {"presets":["react", "es2015"]});
  
  createFile('./public/index.html', indexHTML);
  createFile('webpack.config.js', webpackConfig);
  createFile('./app/App.js', appJS);
  createFile('./app/components/Sample.js', componentSample);
  createFile('./__tests__/Sample-test.js', sampleTest);

  npmInstall(npms);
}

function createDirectories(dirs) {
  dirs.map(function(dir) {
    if (!fs.existsSync(dir)) { 
      fs.mkdirSync(dir); 
      console.log("Create:", dir);
    }
  })
}

function npmInstall(npms) {
  npms.map(function(command) {
    console.log(command);
    exec(command, puts);
  });
}

function puts(error, stdout, stderr) { 
  util.puts(stdout);
  util.puts(stderr);
  util.puts(error);
}

function createFile(file, content) {
  if (!fs.existsSync(file)) { 
    fs.writeFileSync(file, content);
    console.log('Create:', file);
  }
}

function createJSON(file, json) {
  if (!fs.existsSync(file)) { 
    fs.writeFileSync(file, JSON.stringify(json, null, "  "));
    console.log('Create:', file);
  }
}

function fixJSON(file, key, value) {
  var json = JSON.parse(fs.readFileSync(file));
  json[key] = value;
  fs.writeFileSync(file, JSON.stringify(json, null, "  "));
  console.log('Fix:', file, 'Key:', key);
}

