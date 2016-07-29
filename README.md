# Vigilant Octo-Robot
> A conversation about particle systems, effects queues, and their applications - with Matt Hayes

### Getting setup:
```bash
$ git clone git@github.com:mysterycommand/vigilant-octo-robot.git
$ cd vigilant-octo-robot
$ npm install
$ npm start # uses webpack-dev-server
```
… and that should be it! Uses Webpack and Babel to bundle everything as a `./main.js` and serves the `./source` folder (with it's simple `index.html` file pulling in the JS).

### Credit where credit's due:
This work is heavily inspired by a talk by Seb Lee-Delisle from 2007 called [AS3 Particles: 1000% Extra Free](http://seb.ly/2007/09/as3-particles-1000-extra-free/).

The repo is organized into branches and step-wise PRs. Branches are labeled by number `01` - `13`, and each PR has been created agains the previous numbered branch (I hope that makes sense).

Branch #13 (PR #17 because I had a couple hiccup PRs along the way) is an implementation that uses the `ParticleField` class built up through branches 1 - 12 in a practical way. It pre-creates (pools) a bunch of DOM nodes and recycles them when rendering into a scroll container. In this way there are only ~25 (on my screen anyway) "particles" being rendered each frame and scrolling through a 5,000 (or longer) item list should be fairly snappy.

That particulare use case was inspired by the [Complexities of an infinite scroller](https://developers.google.com/web/updates/2016/07/infinite-scroller?hl=en) article ([and repo](https://github.com/GoogleChrome/ui-element-samples/tree/gh-pages/infinite-scroller)) published by Google. Their implementation handles a bunch of other issues, but I find the ParticleField abstraction to be a convenient/reason-about-able way to model that behavior.

### Makes heavy use of Babel & Webpack, particularly:
```json
"babel-loader": "^6.2.4",
"babel-plugin-transform-runtime": "^6.9.0",
"babel-preset-es2015": "^6.9.0",
"babel-register": "^6.11.5",
"chai": "^3.5.0",
"eslint": "^3.1.1",
"lodash": "^4.14.0",
"mocha": "^2.5.3",
"webpack": "^1.13.1",
"webpack-dev-server": "^1.14.1"
```
