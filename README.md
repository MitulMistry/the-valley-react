# The Valley
![screenshot](readme_the_valley.jpg)

An HTML5 text adventure system using [React](https://github.com/facebook/react) and [Redux](https://github.com/reduxjs/react-redux).

The Valley is a JavaScript based system for loading, playing, and managing non-linear text adventures. It allows for branching paths based on the player's choices and keeps track of progress and past decisions.

<!-- ## Demo App
Sample application deployed on Heroku: https://the-valley.herokuapp.com/ -->

## Features
- Non-linear branching paths: Progress along a variety of storylines that change and react.
- Player tracking: Keeps a record of choices made and makes data available to affect future decisions and open or close branching storylines.
- Load stories through JSON: Uses static JSON files to load the stories and player choices along with associated variables. Stories can be created in spreadsheets/CSV files, but must be manually converted to JSON before loading in application.

## Redux
- The store saves to browser storage and loads from there when visiting the application again. For making changes or trouble shooting, try clearing the browser history before reloading the application to start with a fresh state.

## Application Info
Project initialized with [Create React App](https://github.com/facebook/create-react-app).
<!-- Project set up according to [phaser-es6-webpack](https://github.com/lean/phaser-es6-webpack). Configured with [Node Package Manager](https://www.npmjs.com/), [Webpack](https://webpack.js.org/), and [Babel](https://babeljs.io/). -->

<!-- ## Project Structure
### Initiation
The game initiates through [index.html](../master/src/index.html) and loads scripts through [main.js](../master/src/main.js). If deployed to a webhost, the game initiates through [server.js](../master/server.js).

### [States](../master/src/states)
The game runs through Phaser states that load and run different aspects of the project (menu, splash screen, etc.).

### [Mechanics](../master/src/mechanics)
The game uses systems to load text and manage the game state.

### Other
The game stores data in [globals](../master/src/globals), loads JSON files under [story modules](../master/src/storyModules), and keeps graphics under [assets](../master/assets). -->

## Commands
npm run start - Starts the development server.

npm run build - Bundles the app into static files for production.

npm run test - Starts the test runner.

npm run eject - Removes this tool (Create React App) and copies build dependencies, configuration files and scripts into the app directory. If you do this, you can’t go back!

<!-- ## Install Instructions
Node Package Manager (NPM) is used for dependencies. To install the application locally, follow these instructions:

1. Install [Node.js](https://nodejs.org/). NPM comes packaged with it.
2. Run `npm install` in the command line while in the project directory. It will install dependencies from the [package.json file](../master/package.json).
3. To build for development and run the local dev server at http://localhost:3000, run `npm run dev`.

For production, if deploying to Heroku, set the config variable `NPM_CONFIG_PRODUCTION` to `false` so it properly installs Webpack before building the application. -->