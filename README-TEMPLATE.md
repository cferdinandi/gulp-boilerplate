# {{project name - title case}} [![Build Status](https://travis-ci.org/{{GitHub username}}/{{project name - lowercase}}.svg)](https://travis-ci.org/{{GitHub username}}/{{project name - lowercase}})
DESCRIPTION.

[Download {{project name - title case}}](https://github.com/{{GitHub username}}/{{project name - lowercase}}/archive/master.zip) / [View the demo](http://{{GitHub username}}.github.io/{{project name - lowercase}}/)



## Getting Started

Compiled and production-ready code can be found in the `dist` directory. The `src` directory contains development code. Unit tests are located in the `test` directory.

### 1. Include {{project name - title case}} on your site.

```html
<link rel="stylesheet" href="dist/css/{{project name - lowercase}}.css">
<script src="dist/js/{{project name - lowercase}}.js"></script>
```

### 2. Add the markup to your HTML.

Details...

```html
Markup here...
```

### 3. Initialize {{project name - title case}}.

In the footer of your page, after the content, initialize {{project name - title case}}. And that's it, you're done. Nice work!

```html
<script>
	{{project name - lowercase}}.init();
</script>
```



## Installing with Package Managers

You can install NAMEPSACE-UP with your favorite package manager.

* **NPM:** `npm install {{GitHub username}}/{{project name - lowercase}}`
* **Bower:** `bower install https://github.com/{{GitHub username}}/{{project name - lowercase}}.git`
* **Component:** `component install {{GitHub username}}/{{project name - lowercase}}`



## Working with the Source Files

If you would prefer, you can work with the development code in the `src` directory using the included [Gulp build system](http://gulpjs.com/). This compiles, lints, and minifies code, and runs unit tests.

### Dependencies
Make sure these are installed first.

* [Node.js](http://nodejs.org)
* [Gulp](http://gulpjs.com) `sudo npm install -g gulp`

### Quick Start

1. In bash/terminal/command line, `cd` into your project directory.
2. Run `npm install` to install required files.
3. When it's done installing, run one of the task runners to get going:
	* `gulp` manually compiles files.
	* `gulp watch` automatically compiles files and applies changes using [LiveReload](http://livereload.com/).
	* `gulp test` compiles files and runs unit tests.



## Options and Settings

{{project name - title case}} includes smart defaults and works right out of the box. But if you want to customize things, it also has a robust API that provides multiple ways for you to adjust the default options and settings.

### Global Settings

You can pass options and callbacks into {{project name - title case}} through the `init()` function:

```javascript
{{project name - lowercase}}.init({
	// Settings go here...
});
```

### Override settings with data attributes

{{project name - title case}} also lets you override global settings on a link-by-link basis using the `[data-options]` data attribute:

```html
// Markup here...
```

### Use {{project name - title case}} events in your own scripts

You can also call {{project name - title case}} events in your own scripts.

#### functionName()
Description

```javascript
// Functions here...
```

**Example**

```javascript
// Example here...
```

#### destroy()
Destroy the current `{{project name - lowercase}}.init()`. This is called automatically during the `init` function to remove any existing initializations.

```javascript
{{project name - lowercase}}.destroy();
```



## Browser Compatibility

{{project name - title case}} works in all modern browsers, and IE 9 and above.

{{project name - title case}} is built with modern JavaScript APIs, and uses progressive enhancement. If the JavaScript file fails to load, or if your site is viewed on older and less capable browsers, all content will be displayed by default.



## How to Contribute

In lieu of a formal style guide, take care to maintain the existing coding style. Please apply fixes to both the development and production code. Don't forget to update the version number, and when applicable, the documentation.



## License

The code is available under the [MIT License](LICENSE.md).