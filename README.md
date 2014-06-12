# GulpOSS

My Gulp.js boilerplate for creating new JavaScript projects! Use if you will, if so here's a brief intro as to what it does.

This boilerplate does the following:

* Provides a [UMD](https://github.com/umdjs/umd) wrapper for JavaScript modules, `project.js` (rename to suit)
* Lints `src/*.js`
* Adds a copyright banner to outputted files, configurable
* Compiles a `*.js` and `*.min.js` version of the `src/*.js` file
* Cleans the `dist` directory each time files compiled
* Boots a Karma server, runs Jasmine unit tests on `src/*.js` file
* Evalutes Jasmine tests using PhantomJS (headless WebKit)
* Prints tests on the command line
* Ships with `.travis.yml` which runs `gulp` on [TravisCI](https://travis-ci.org)

### Dependencies

* [PhantomJS](http://phantomjs.org), best installed using [Brew](http://brew.sh)
* [Node.js](http://nodejs.org)
* [Gulp](http://gulpjs.com) `npm install -g gulp`

### How to use

Inside `gulpfile.js` you'll see the following, rename the `scripts: []` file to your desired name:

```js
var paths = {
  output : 'dist/',
  scripts : [
    'src/project.js'
  ],
  test: [
    'test/spec/**/*.js'
  ]
};
```

Inside `package.json` you'll be able to change the names of the project.

Inside `project.js` is the UMD setup which returns an Object from the module, an enhanced Module pattern. Rename `root.MYPROJECT` to suit.

Inside `spec-myproject.js` is an example `describe()` to setup the first [Jasmine](http://jasmine.github.io) unit test.

Run `npm install` and `gulp` to get going.
