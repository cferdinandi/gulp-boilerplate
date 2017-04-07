# Gulp Boilerplate [![Build Status](https://travis-ci.org/cferdinandi/gulp-boilerplate.svg)](https://travis-ci.org/cferdinandi/gulp-boilerplate)

My boilerplate for creating new web projects with [Gulp.js](http://gulpjs.com/). Forked from [Todd Motto's GulpOSS](https://github.com/toddmotto/gulp-oss) with some additions from [Mark Goodyear and Big Bite Creative](https://github.com/bigbitecreative/base) and various tutorials around the web.

- Lints, concatenates, and optimizes JavaScript files.
- Compiles Sass files and automatically [adds vendor prefixes](https://github.com/ai/autoprefixer).
- Exports both minified and expanded JavaScript and CSS files with header info.
- Optimizes SVGs.
- Generates SVG sprites.
- Generates documentation.
- Cleans up file directories.
- Includes a `.travis.yml` file for continuous integration with [TravisCI](https://travis-ci.org).

[Download Gulp Boilerplate](https://github.com/cferdinandi/gulp-boilerplate/archive/master.zip)


## Getting Started

### Dependencies
Make sure these are installed first.

- [Node.js](http://nodejs.org)
- [Gulp](http://gulpjs.com) `sudo npm install -g gulp`

### Quick Start

1. In bash/terminal/command line, `cd` into your project directory.
2. Run `npm install` to install required files.
3. When it's done installing, run one of the task runners to get going:
	- `gulp` manually compiles files.
	- `gulp watch` automatically compiles files and applies changes using [LiveReload](http://livereload.com/).



## File Structure

Add your files to the appropriate `src` subdirectories. Gulp will process and and compile them into `dist`.

- Content in subdirectories under the `js` folder will be concatenated. For example, files in `js/detects` will compile into `detects.js`. Files directly under `js` will compile individually.
- Files in the `img` directory will be copied as-is into the `dist/img` directory.
- SVG files placed in the `src/svg` directory will be optimized and compiled into the `dist/svg` directory. SVG files placed in a subdirectory of `src/svg` will be compiled into a single SVG sprite named after the subdirectory.
- Files placed in the `static` directory will be copied as-in into the `dist` directory.

```
gulp-boilerplate/
|—— dist/
|   |—— css/
|   |   |—— myplugin.css
|   |   |—— myplugin.min.css
|   |—— img/
|   |   |—— # image files
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
|   |—— img/
|   |   |—— # image files
|   |—— js/
|   |   |—— classList.js
|   |   |—— myplugin.js
|   |—— sass/
|   |   |—— _config.scss
|   |   |—— _mixins.scss
|   |   |—— components/
|   |   |   |—— myplugin.scss
|   |—— img/
|   |   |—— # static files and folders
|   |—— static/
|   |   |—— # static files
|   |—— svg/
|   |   |—— # svgs
|—— .travis.yml
|—— gulfile.js
|—— package.json
|—— README.md
```



## Working with the Source Files

### Sass

Sass files are located in `src` > `sass`. Gulp generates minified and unminified CSS files. It also includes [autoprefixer](https://github.com/postcss/autoprefixer), which adds vendor prefixes for you if required by the last two versions of a browser.

### JavaScript

JavaScript files are located in the `src` > `js` directory.

Files placed directly in the `js` folder will compile directly to `dist` > `js` as both minified and unminified files. Files placed in subdirectories will also be concatenated into a single file. For example, files in `js/detects` will compile into `detects.js`. Files directly under `js` will compile individually.

### Images

Image files placed in the `src` > `img` directory will be copied as-is into the `dist` > `img` directory. While you can add image optimization processes to Gulp, I find that tools like [ImageOptim](https://imageoptim.com/) and [b64.io](http://b64.io/) do a better job.

### Static Files

Files and folders placed in the `src` > `static` directory will be copied as-is into the `dist` directory.

### SVGs

SVG files placed in the `src/svg` directory will be optimized with SVGO and compiled into `dist/svg` as-is.

SVG files placed in subdirectories of `src/svg` will be ocmpiled into a single SVG sprite named after the parent directory. For example, files in `src/svg/icons` would compile into a single `icons.svg` file.

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
        input: 'src/svg/*',
        output: 'dist/svg/'
    },
    images: {
        input: 'src/img/*',
        output: 'dist/img/'
    },
    static: {
        input: 'src/static/*',
        output: 'dist/'
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

### Travis CI

This boilerplate includes a configuration file for [Travis CI](http://docs.travis-ci.com/user/getting-started/), a continuous integration service for GitHub.

If you sign-up and activate it for your repository, Travis CI will run your build and execute any processes to make sure everything is working as expected. This is particularly useful when working with a team or managing open source projects with multiple contributors.

The `.travis.yml` file is pre-configured for the boilerplate's build system. Even if you add files or update the Gulp tasks, you shouldn't need to change anything for it to work.

### Codeship

This boilerplate also works with [Codeship.io](https://codeship.com/).

After you have signed up and connected your repository you will be given options for configuring your tests. In the dropdown labeled `Select your technology to prepopulate basic commands` choose `node.js.` This will cause codeship to run npm install prior to running your tests.

Then in the `Configure Test Pipelines` box replace `grunt test` with `gulp test.` Save your settings and make
a commit to your repository. Codeship should then build and test your repository successfully.



## How to Contribute

Please review the  [contributing guidelines](CONTRIBUTING.md).



## License

The code is available under the [MIT License](LICENSE.md).