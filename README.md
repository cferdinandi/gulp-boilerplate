# Gulp Boilerplate [![Build Status](https://travis-ci.org/cferdinandi/gulp-boilerplate.svg)](https://travis-ci.org/cferdinandi/gulp-boilerplate)

My boilerplate for creating new web projects with [Gulp.js](http://gulpjs.com/). Forked from [Todd Motto's GulpOSS](https://github.com/toddmotto/gulp-oss) with some additions from [Mark Goodyear and Big Bite Creative](https://github.com/bigbitecreative/base).

* Lints and concatenates JS files.
* Compiles Sass files and automatically [adds vendor prefixes](https://github.com/ai/autoprefixer).
* Exports both minified and expanded JS and CSS files.
* Cleans up file directories.
* Adds a header to the top of all JS and CSS files.
* Runs Jasmine unit tests and generates reports.
* Includes a `.travis.yml` file for continuous integration with [TravisCI](https://travis-ci.org).

[Download Gulp Boilerplate](https://github.com/cferdinandi/gulp-boilerplate/archive/master.zip)

**In This Documentation**

1. [Getting Started](#getting-started)
2. [Options & Settings](#options-and-settings)
3. [Unit Testing](#unit-testing)
3. [License](#license)
4. [Changelog](#changelog)

## Getting Started

### Dependencies
Make sure these are installed first.

* [PhantomJS](http://phantomjs.org)
* [Node.js](http://nodejs.org)
* [Gulp](http://gulpjs.com) `sudo npm install -g gulp`

### Quick Start

1. In bash/terminal/command line, `cd` into your project directory.
2. Run `npm install` to install required files.
3. When it's done installing, run `gulp` to get going.

Every time you want to run your tasks, run `gulp`.

### File Structure

```
gulp-boilerplate/
|-- dist/
|   |-- js/
|   |   |-- myplugin.js
|   |   |-- myplugin.min.js
|   |-- css/
|   |   |-- myplugin.css
|   |   |-- myplugin.min.css
|-- src/
|   |-- js/
|   |   |-- myplugin.js
|   |-- sass/
|   |   |-- myplugin.sass
|-- test/
|   |-- coverage/
|   |   |-- various files
|   |-- results/
|   |   |-- unit-tests.html
|   |-- spec/
|   |   |-- spec-myplugin.js
|-- gulfile.js
|-- package.json
|-- README.md
```



## Options and Settings

### Updating Project Details

Open up `package.json` to change the name, version, URL and other data about the project.

### Changing the Header

Inside `gulpfile.js`, `banner` is the expanded header, while `bannerMin` is included with minified content.

### Changing the Directory Structure

Inside `gulpfile.js` you'll see a variable named `paths`. Adjust the paths to suit your workflow.

```js
var paths = {
	output : 'dist/',
	scripts : {
		input : [ 'src/js/**/*.js' ],
		output : 'dist/js/'
	},
	styles : {
		input : 'src/sass/**/*.scss',
		output : 'dist/css/'
	},
	test : {
		spec : [ 'test/spec/**/*.js' ],
		coverage: 'test/coverage/',
		results: 'test/results/'
	}
};
```


## Unit Testing

Gulp Boilerplate is set up for unit testing with [Jasmie](http://jasmine.github.io/2.0/introduction.html). Add your tests to `test/spec/spec-myplugin.js`. Adjust filenames and references as needed.

Unit test results are printed in terminal, but you can also view them in a browser under `test/results/unit-tests.html`. Get a report of how much of your scripts is covered by testing under `test/coverage`.


## License

Gulp Boilerplate is licensed under the [MIT License](http://gomakethings.com/mit/).



## Changelog

* v0.0.2 - June 12, 2014
	* Added coverage reporting and an HTML unit test report.
	* Added Sass support.
	* Added concatenation process of JS.
* v0.0.1 - June 11, 2014
	* Initial release.