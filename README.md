# Gulp Boilerplate [![Build Status](https://travis-ci.org/cferdinandi/gulp-boilerplate.svg)](https://travis-ci.org/cferdinandi/gulp-boilerplate)

My [Gulp.js](http://gulpjs.com/) boilerplate for creating new web projects. Forked from [Todd Motto's GulpOSS](https://github.com/toddmotto/gulp-oss) with some additions from [Mark Goodyear and Big Bite Creative](https://github.com/bigbitecreative/base). Use if you will, if so here's a brief intro as to what it does.

This boilerplate does the following:

* Provides a [UMD](https://github.com/umdjs/umd) wrapper for JavaScript modules, `myplugin.js` (rename to suit)
* Lints `src/**/*.js`
* Adds a copyright banner to outputted files, configurable
* Concatenates `*.js` files into a single `main.js` file
* Compiles a `*.js` and `*.min.js` version of the `src/**/*.js` files
* Compiles a `*.css` and `*.min.css` version of the `src/**/*.scss` files
* [Autoprefixes](https://github.com/ai/autoprefixer) all styles with vendor prefixes as needed
* Cleans the `dist` directory each time files compiled
* Boots a Karma server, runs Jasmine unit tests on `src/**/*.js` files
* Evalutes Jasmine tests using PhantomJS (headless WebKit)
* Prints tests on the command line
* Ships with `.travis.yml` which runs `gulp` on [TravisCI](https://travis-ci.org)

### Dependencies

* [PhantomJS](http://phantomjs.org)
* [Node.js](http://nodejs.org)
* [Gulp](http://gulpjs.com) `sudo npm install -g gulp`

### How to use

Inside `gulpfile.js` you'll see the following. Adjust the paths to suit your workflow.

```js
var paths = {
	output : 'dist/',
	scripts : {
		input: [ 'src/**/*.js' ],
		output: 'dist/js/'
	},
	styles : {
		input: 'src/**/*.scss',
		output: 'dist/css/'
	},
	test: [ 'test/spec/**/*.js' ]
};
```

Change the name, version, URL and other data about the project in `package.json`. `myplugin.js` is my UMD boilerplate. Rename `root.MyPlugin` to suit your project. Inside `spec-myproject.js` is an example `describe()` to setup the first [Jasmine](http://jasmine.github.io) unit test.

In bash/terminal/command line, run `npm install`, then `gulp` to get going.