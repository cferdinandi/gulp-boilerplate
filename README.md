# Gulp Boilerplate [![Build Status](https://travis-ci.org/cferdinandi/gulp-boilerplate.svg)](https://travis-ci.org/cferdinandi/gulp-boilerplate)

My boilerplate for creating new web projects with [Gulp.js](http://gulpjs.com/). Forked from [Todd Motto's GulpOSS](https://github.com/toddmotto/gulp-oss) with some additions from [Mark Goodyear and Big Bite Creative](https://github.com/bigbitecreative/base) and various tutorials around the web.

* Lints and concatenates JS files.
* Compiles Sass files and automatically [adds vendor prefixes](https://github.com/ai/autoprefixer).
* Exports both minified and expanded JS and CSS files with header info.
* Generates SVG sprites.
* Generates documentation.
* Cleans up file directories.
* Runs Jasmine unit tests and generates reports.
* Includes a `.travis.yml` file for continuous integration with [TravisCI](https://travis-ci.org).

[Download Gulp Boilerplate](https://github.com/cferdinandi/gulp-boilerplate/archive/master.zip)

**In This Documentation**

1. [Getting Started](#getting-started)
2. [File Structure](#file-structure)
3. [Working with the Source Files](#working-with-the-source-files)
4. [Options & Settings](#options-and-settings)
5. [Continuous Integration](#continuous-integration)
6. [License](#license)
7. [Changelog](#changelog)

## Getting Started

### Dependencies
Make sure these are installed first.

* [Node.js](http://nodejs.org)
* [Ruby Sass](http://sass-lang.com/install)
* [Gulp](http://gulpjs.com) `sudo npm install -g gulp`

### Quick Start

1. In bash/terminal/command line, `cd` into your project directory.
2. Run `npm install` to install required files.
3. When it's done installing, run one of the task runners to get going:
	* `gulp` manually compiles files and runs unit tests.
	* `gulp watch` automatically compiles files, runs unit tests, and applies changes using [LiveReload](http://livereload.com/).



## File Structure

Add your files to the appropriate `src` subdirectories. Gulp will process and and compile them into `dist`.

* Content in subdirectories under the `js` folder will be concatenated. For example, files in `js/detects` will compile into `detects.js`. Files directly under `js` will compile individually.
* SVGs in the `svg` directory will compile into `icons.svg`.
* Assets in the `assets` directory will be copied as-is into the `dist` directory.

```
gulp-boilerplate/
|—— dist/
|   |—— css/
|   |   |—— myplugin.css
|   |   |—— myplugin.min.css
|   |—— js/
|   |   |—— classList.js
|   |   |—— classList.min.js
|   |   |—— myplugin.js
|   |   |—— myplugin.min.js
|   |—— svg/
|   |   |—— icons.svg
|   |—— # static assets
|—— docs/
|   |—— assets/
|   |—— dist/
|   |—— index.html
|   |—— # other docs
|—— src/
|   |—— docs/
|   |   |—— _templates/
|   |   |   |—— _header.html
|   |   |   |—— _footer.html
|   |   |—— assets/
|   |   |   |—— # doc-specific assets
|   |   |—— index.html
|   |   |—— # other docs
|   |—— js/
|   |   |—— classList.js
|   |   |—— myplugin.js
|   |—— sass/
|   |   |—— _config.scss
|   |   |—— _mixins.scss
|   |   |—— components/
|   |   |   |—— myplugin.scss
|   |—— svg/
|   |   |—— # svgs
|   |—— static/
|   |   |—— # static assets
|—— test/
|   |—— coverage/
|   |   |—— various files
|   |—— results/
|   |   |—— unit-tests.html
|   |—— spec/
|   |   |—— spec-myplugin.js
|—— .travis.yml
|—— gulfile.js
|—— index.html
|—— package.json
|—— README.md
|—— README-TEMPLATE.md
```



## Working with the Source Files

### Sass

Sass files are located in `src` > `sass`. Gulp generates minified and unminified CSS files. It also includes [autoprefixer](https://github.com/postcss/autoprefixer), which adds vendor prefixes for you if required by the last two versions of a browser.

### JavaScript

JavaScript files are located in the `src` > `js` directory.

Files placed directly in the js folder will compile directly to `dist` > `js` as both minified and unminified files. Files placed in subdirectories will also be concatenated into a single file. For example, files in `js/detects` will compile into `detects.js`. Files directly under `js` will compile individually.

#### Unit Testing

Gulp Boilerplate is set up for unit testing with [Jasmine](http://jasmine.github.io/2.0/introduction.html). Add your tests to `test/spec/spec-myplugin.js`. Adjust filenames and references as needed.

Unit test results are printed in terminal, but you can also view them in a browser under `test/results/unit-tests.html`. Get a report of how much of your scripts is covered by testing under `test/coverage`.

### SVGs

SVG files placed in the `src` > `svg` directory will be compiled into a single SVG sprite called `icons.svg` in the `dist` > `svg` directory.

### Documentation

Add HTML or markdown (`.md` or `.markdown`) files to your `docs` folder in `src`.

The `_templates` directory in `src` contains the `_header.html` and `_footer.html` templates. These are automatically added to the beginning and end of each documentation page. You can also add your own templates to the `_templates` directory. Include template files in your docs by writing `@@include('path-to-file')` on its own line in your markup (or markdown).

Files placed in the `assets` directory will be moved over as-is to the `docs` directory. The boilerplate will also add a copy of your `dist` files so you can use them in your documentation.



## Options and Settings

### Updating Project Details
Open up `package.json` to change the name, version, URL and other data about the project.

### Changing the Header
Inside `gulpfile.js`, `banner.full` is the expanded header, while `banner.min` is included with minified content.

### Changing the Directory Structure
Inside `gulpfile.js` you'll see a variable named `paths`. Adjust the paths to suit your workflow.

```js
var paths = {
	input: 'src/**/*',
	output: 'dist/',
	scripts: {
		input: 'src/js/*',
		output: 'dist/js/'
	},
	styles: {
		input: 'src/sass/**/*.{scss,sass}',
		output: 'dist/css/'
	},
	svgs: {
		input: 'src/svg/**/*.svg',
		output: 'dist/svg/'
	},
	static: 'src/static/**',
	test: {
		input: 'src/js/**/*.js',
		karma: 'test/karma.conf.js',
		spec: 'test/spec/**/*.js',
		coverage: 'test/coverage/',
		results: 'test/results/'
	},
	docs: {
		input: 'src/docs/*.{html,md,markdown}',
		output: 'docs/',
		templates: 'src/docs/_templates/',
		assets: 'src/docs/assets/**'
	}
};
```



## Continuous Integration

This boilerplate includes a configuration file for [Travis CI](http://docs.travis-ci.com/user/getting-started/), a continuous integration service for GitHub.

If you sign-up and activate it for your repository, Travis CI will run your build and execute any processes to make sure everything is working as expected. This is particularly useful when working with a team or managing open source projects with multiple contributors.

The `.travis.yml` file is pre-configured for the boilerplate's build system. Even if you add files or update the Gulp tasks, you shouldn't need to change anything for it to work.



## License

Gulp Boilerplate is licensed under the [MIT License](http://gomakethings.com/mit/).



## Changelog

Gulp Boilerplate uses [semantic versioning](http://semver.org/).

* v1.3.1 - March 9, 2015
	* Fixed UMD wrapper.
* v1.3.0 - January 7, 2014
	* Updated Sass config.
* v1.2.0 - January 7, 2014
	* Updated Sass build with line numbers.
* v1.1.2 - November 20, 2014
	* Fixed live reload bug.
* v1.1.1 - October 20, 2014
	* Added documentation on generating docs.
* v1.1.0 - October 18, 2014
	* Added documentation generator.
	* Added SVG sprite generator.
	* Added LiveReload and change watching tasks.
	* Renamed Gulp tasks for better semantics.
	* Updated docs.
* v1.0.2 - October 2, 2014
    * Added CommonJS bug fix.
    * Updated readme.md to reflect new file structure.
* v1.0.1 - September 29, 2014
	* Fixed JS concatenation bug.
* v1.0.0 - August 31, 2014
	* Fixed event listener filter to account for sub elements.
* v0.7.0 - August 24, 2014
	* Add new task(s) for concatenating scripts. DRYer code.
* v0.6.0 - August 23, 2014
	* Updated to event bubbling setup.
* v0.5.0 - August 23, 2014
	* Updated unit tests path.
* v0.4.0 - August 15, 2014
	* Added `STARTER-README.MD`.
	* Added `index.html` template.
	* Added placeholders for variables, settings extending, and other methods.
* v0.3.0 - August 15, 2014
	* Updated path with testing path for scripts.
	* Switched to Ruby Sass for better compatibility with Sass 3.x features.
	* Updated callback structure.
* v0.2.3 - August 15, 2014
	* Added fix for UMD structure.
* v0.2.2 - August 8, 2014
	* Added polyfills for `Functions.prototype.bind` and `element.classList`.
* v0.2.1 - July 21, 2014
	* Updated `getDataOptions` method to use JSON.
	* Removed auto-dating from minified files.
* v0.1.0 - June 26, 2014
	* Added helper functions to the unit test spec.
* v0.0.5 - June 19, 2014
	* Fixed factory/root/UMD definition.
* v0.0.4 - June 16, 2014
	* Added ability to concatenate `src/js` subdirectories.
* v0.0.3 - June 15, 2014
	* Converted header banner to an object.
	* Added timestamp to minified file names for cache busting.
	* Added `static` folder for static assets.
* v0.0.2 - June 12, 2014
	* Added coverage reporting and an HTML unit test report.
	* Added Sass support.
	* Added concatenation process of JS.
* v0.0.1 - June 11, 2014
	* Initial release.
