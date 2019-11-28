# Gulp Boilerplate [![Build Status](https://travis-ci.org/cferdinandi/gulp-boilerplate.svg)](https://travis-ci.org/cferdinandi/gulp-boilerplate)

A boilerplate for building web projects with [Gulp](https://gulpjs.com/). Uses Gulp 4.x.

**Features**

- Concatenate, minify, and lint JavaScript.
- Compile, minify, autoprefix, and lint Sass.
- Optimize SVGs.
- Copy static files and folders into your `dist` directory.
- Automatically add headers and project details to JS and CSS files.
- Remove unused CSS.
- Create polyfilled and non-polyfilled versions of JS files.
- Watch for file changes, and automatically recompile build and reload webpages.

**Gulp Boilerplate makes it easy to turn features on and off**, so you can reuse it for all of your projects without having to delete or modify tasks.



## Getting Started

### Dependencies

*__Note:__ if you've previously installed Gulp globally, run `npm rm --global gulp` to remove it. [Details here.](https://medium.com/gulpjs/gulp-sips-command-line-interface-e53411d4467)*

Make sure these are installed first.

- [Node.js](http://nodejs.org)
- [Gulp Command Line Utility](http://gulpjs.com) `npm install --global gulp-cli`

### Quick Start

1. In bash/terminal/command line, `cd` into your project directory.
2. Run `npm install` to install required files and dependencies.
3. When it's done installing, run one of the task runners to get going:
	- `gulp` manually compiles files.
	- `gulp watch` automatically compiles files and applies changes using [BrowserSync](https://browsersync.io/) when you make changes to your source files.

**Try it out.** After installing, run `gulp` to compile some test files into the `dist` directory. Or, run `gulp watch` and make some changes to see them recompile automatically.



## Documentation

Add your source files to the appropriate `src` subdirectories. Gulp will process and and compile them into `dist`.

- JavaScript files in the `src/js` directory will be compiled to `dist/js`. Files in subdirectories under the `js` folder will be concatenated. For example, files in `js/detects` will compile into `detects.js`.
- Files in the `src/sass` directory will be compiled to `dist/css`.
- SVG files placed in the `src/svg` directory will be optimized with SVGO and compiled into `dist/svg`.
- Files and folders placed in the `copy` directory will be copied as-is into the `dist` directory.

### package.json

The `package.json` file holds all of the details about your project.

Some information is automatically pulled in from it and added to a header that's injected into the top of your JavaScript and CSS files.

```json
{
	"name": "project-name",
	"version": "0.0.1",
	"description": "A description for your project.",
	"main": "./dist/your-main-js-file.js",
	"author": {
		"name": "YOUR NAME",
		"url": "http://link-to-your-website.com"
	},
	"license": "MIT",
	"repository": {
		"type": "git",
		"url": "http://link-to-your-git-repo.com"
	},
	"devDependencies": {}
}
```

*__Note:__ `devDependencies` are the dependencies Gulp uses. Don't change these or you'll break things. If any of the other fields are removed, make sure to remove reference to them in the Header (under `var banner` in `gulpfile.js`) or `gulp watch` won't run.*

### JavaScript

Put your JavaScript files in the `src/js` directory.

Files placed directly in the `js` folder will compile directly to `dist/js` as both minified and unminified files. Files placed in subdirectories under `src/js` will also be concatenated into a single file. For example, files in `js/detects` will compile into `detects.js`.

*__A note about polyfills:__ In subdirectories that contain files with the `.polyfill.js` suffix (for example, `_matches.polyfill.js`), two versions will be created: one with the polyfill files, and one without.*

### Sass

Put your [Sass](https://sass-lang.com/) files in the `src/sass` directory.

Gulp generates minified and unminified CSS files. It also includes [autoprefixer](https://github.com/postcss/autoprefixer), which adds vendor prefixes for you.

### Purge Unused CSS

Unused CSS can be removed from your CSS files. To enable this feature, set `purge: true` in `gulpfile.js` (default is `false`). Be sure to go to "Paths to files for PurgeCSS" under paths and list any file that uses or affects your CSS.

By default, all .html files from the copy-output folder and all .js files in the scripts-output folder are set to be analysed. You should add any file which uses or influences your CSS. For example, if you have a page which uses style `.foo` on a nav bar and you have a javascript file which changes the nav bar's class to also include `.bar` once the user scrolls down the page, including the javascript file in the list will allow purgecss to analyse it so it can see that this class is used at some point and so won't be incorrectly considered as unused CSS and removed.

It can take a little trial and error to ensure a page has all of the CSS it's meant to have. Often, whitelisting CSS that you want to be included in all circumstances can fix any issues that arise. Adding `/* purgecss start ignore */` before and `/* purgecss end ignore */` after any CSS in your sass files you want kept no matter what is one method of doing this. For more details on this and other methods, please refer to the [PurgeCSS dcoumentation](https://www.purgecss.com/whitelisting).

### SVGs

Place SVG files in the `src/svg` directory.

SVG files will be optimized with [SVGO](https://github.com/svg/svgo) and compiled into `dist/svg`.

### Copy Files

Files and folders placed in the `src/copy` directory will be copied as-is into `dist`.

This is a great place to put HTML files, images, and pre-compiled assets.



## Options & Settings

Gulp Boilerplate makes it easy to customize for projects without having to delete or modify tasks.

Options and settings are located at the top of the `gulpfile.js`.

### Settings

Set features under the `settings` variable to `true` to turn them on (default), and `false` to turn them off.

```js
/**
 * Settings
 * Turn on/off build features
 */

var settings = {
	clean: true,
	scripts: true,
	polyfills: true,
	styles: true,
	svgs: true,
	copy: true,
	reload: true,
	purge: false
};
```

### Paths

Adjust the `input` and `output` paths for all of the Gulp tasks under the `paths` variable. Paths are relative to the root project folder.

```js
/**
 * Paths to project folders
 */

var paths = {
	input: 'src/',
	output: 'dist/',
	scripts: {
		input: 'src/js/*',
		// polyfills: '!src/js/*.polyfill.js',
		polyfills: '.polyfill.js',
		output: 'dist/js/'
	},
	styles: {
		input: 'src/sass/**/*.{scss,sass}',
		output: 'dist/css/'
	},
	svgs: {
		input: 'src/svg/*.svg',
		output: 'dist/svg/'
	},
	copy: {
		input: 'src/copy/*',
		output: 'dist/'
	},
	reload: './dist/'
};
```

If purging of unused CSS is enabled, set the paths to any file that uses or influences your CSS. By default, it is set to analyse all html files in the copy - output path and all javascipt files in the scripts - output path. It is safe to remove or alter these lines if they are not relevant to your project.

```js
/**
 * Paths to files for PurgeCSS
 */
var purgePipe = lazypipe()
	.pipe(purgecss, {
		content: [
			// Add files below that use or affect your CSS. These are analysed by PurgeCSS to see what CSS is or isn't used.
			// E.g. paths.copy.output + 'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
			paths.copy.output + '**/*.html',
			paths.scripts.output + '**/*.js',
		]
	});
```

### Header

Gulp auto-injects a header into all of your JavaScript and CSS files with details from your `package.json` file.

You can change what's included under the `banner` variable.

```js
/**
 * Template for banner to add to file headers
 */

var banner = {
	full:
		'/*!\n' +
		' * <%= package.name %> v<%= package.version %>\n' +
		' * <%= package.description %>\n' +
		' * (c) ' + new Date().getFullYear() + ' <%= package.author.name %>\n' +
		' * <%= package.license %> License\n' +
		' * <%= package.repository.url %>\n' +
		' */\n\n',
	min:
		'/*!' +
		' <%= package.name %> v<%= package.version %>' +
		' | (c) ' + new Date().getFullYear() + ' <%= package.author.name %>' +
		' | <%= package.license %> License' +
		' | <%= package.repository.url %>' +
		' */\n'
};
```



## License

The code is available under the [MIT License](LICENSE.md).
