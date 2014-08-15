# NAMESPACE-UP [![Build Status](https://travis-ci.org/GITHUB-USERNAME/NAMESPACE-LOW.svg)](https://travis-ci.org/GITHUB-USERNAME/NAMESPACE-LOW)
DESCRIPTION.

[Download NAMESPACE-UP](https://github.com/GITHUB-USERNAME/NAMESPACE-LOW/archive/master.zip) / [View the demo](http://GITHUB-USERNAME.github.io/NAMESPACE-LOW/).

**In This Documentation**

1. [Getting Started](#getting-started)
2. [Installing with Package Managers](#installing-with-package-managers)
3. [Options & Settings](#options-and-settings)
4. [Browser Compatibility](#browser-compatibility)
5. [How to Contribute](#how-to-contribute)
6. [License](#license)
7. [Changelog](#changelog)
8. [Older Docs](#older-docs)



## Getting Started

Compiled and production-ready code can be found in the `dist` directory. The `src` directory contains development code. Unit tests are located in the `test` directory.

### 1. Include NAMESPACE-UP on your site.

```html
<link rel="stylesheet" href="dist/css/NAMESPACE-LOW.css">
<script src="dist/js/classList.js"></script>
<script src="dist/js/bind-polyfill.js"></script>
<script src="dist/js/NAMESPACE-LOW.js"></script>
```

NAMESPACE-UP is [built with Sass](http://sass-lang.com/) for easy customization. If you don't use Sass, that's ok. The `css` folder contains compiled vanilla CSS.

The `_config.scss` and `_mixins.scss` files are the same ones used in [Kraken](http://GITHUB-USERNAME.github.io/kraken/), so you can drop the `_NAMESPACE-LOW.css` file right into Kraken without making any updates. Or, adjust the variables to suit your own project.

NAMESPACE-UP also requires [classList.js](https://github.com/eligrey/classList.js) and `bind-polyfill.js`, polyfills that extend ECMAScript 5 API support to more browsers.

### 2. Add the markup to your HTML.

```html
Markup here...
```

Details.

### 3. Initialize NAMESPACE-UP.

```html
<script>
	NAMESPACE-LOW.init();
</script>
```

In the footer of your page, after the content, initialize NAMESPACE-UP. And that's it, you're done. Nice work!



## Installing with Package Managers

You can install NAMEPSACE-UP with your favorite package manager.

* **NPM:** `npm install GITHUB-USERNAME/NAMESPACE-LOW`
* **Bower:** `bower install https://github.com/GITHUB-USERNAME/NAMESPACE-LOW.git`
* **Component:** `component install GITHUB-USERNAME/NAMESPACE-LOW`



## Options and Settings

NAMESPACE-UP includes smart defaults and works right out of the box. But if you want to customize things, it also has a robust API that provides multiple ways for you to adjust the default options and settings.

### Global Settings

You can pass options and callbacks into NAMESPACE-UP through the `init()` function:

```javascript
NAMESPACE-LOW.init();
```

### Override settings with data attributes

NAMESPACE-UP also lets you override global settings on a link-by-link basis using the `[data-options]` data attribute:

```html
// Markup here...
```

### Use NAMESPACE-UP events in your own scripts

You can also call NAMESPACE-UP events in your own scripts.

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
Destroy the current `NAMESPACE-LOW.init()`.

```javascript
NAMESPACE-LOW.destroy();
```



## Browser Compatibility

NAMESPACE-UP works in all modern browsers, and IE 9 and above.

NAMESPACE-UP is built with modern JavaScript APIs, and uses progressive enhancement. If the JavaScript file fails to load, or if your site is viewed on older and less capable browsers, all content will be displayed by default.



## How to Contribute

In lieu of a formal style guide, take care to maintain the existing coding style. Don't forget to update the version number, the changelog (in the `readme.md` file), and when applicable, the documentation.



## License

NAMESPACE-UP is licensed under the [MIT License](http://gomakethings.com/mit/).



## Changelog

NAMESPACE-UP uses [semantic versioning](http://semver.org/).

* v1.0 - DATE
	* Initial release.



## Older Docs

* [Version 1](#)