/**
 * Gulp Packages
 */

// General
var gulp = require('gulp');
var fs = require('fs');
var del = require('del');
var lazypipe = require('lazypipe');
var plumber = require('gulp-plumber');
var flatten = require('gulp-flatten');
var tap = require('gulp-tap');
var rename = require('gulp-rename');
var header = require('gulp-header');
var footer = require('gulp-footer');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');
var reload  = browserSync.reload;
var package = require('./package.json');

// Scripts and tests
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var karma = require('gulp-karma');

// Styles
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minify = require('gulp-cssnano');

// SVGs
var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');

// Docs
var markdown = require('gulp-markdown');
var fileinclude = require('gulp-file-include');


/**
 * Paths to project folders
 */

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


/**
 * Template for banner to add to file headers
 */

var banner = {
    full :
        '/*!\n' +
        ' * <%= package.name %> v<%= package.version %>: <%= package.description %>\n' +
        ' * (c) ' + new Date().getFullYear() + ' <%= package.author.name %>\n' +
        ' * MIT License\n' +
        ' * <%= package.repository.url %>\n' +
        ' */\n\n',
    min :
        '/*!' +
        ' <%= package.name %> v<%= package.version %>' +
        ' | (c) ' + new Date().getFullYear() + ' <%= package.author.name %>' +
        ' | MIT License' +
        ' | <%= package.repository.url %>' +
        ' */\n'
};


/**
 * Gulp Taks
 */

// Lint, minify, and concatenate scripts
gulp.task('build:scripts', ['clean:dist'], function() {
    var jsTasks = lazypipe()
        .pipe(header, banner.full, { package : package })
        .pipe(gulp.dest, paths.scripts.output)
        .pipe(rename, { suffix: '.min' })
        .pipe(uglify)
        .pipe(header, banner.min, { package : package })
        .pipe(gulp.dest, paths.scripts.output);

    return gulp.src(paths.scripts.input)
        .pipe(plumber())
        .pipe(tap(function (file, t) {
            if ( file.isDirectory() ) {
                var name = file.relative + '.js';
                return gulp.src(file.path + '/*.js')
                    .pipe(concat(name))
                    .pipe(jsTasks());
            }
        }))
        .pipe(jsTasks());
});

// Process, lint, and minify Sass files
gulp.task('build:styles', ['clean:dist'], function() {
    return gulp.src(paths.styles.input)
        .pipe(plumber())
        .pipe(sass({
            outputStyle: 'expanded',
            sourceComments: true
        }))
        .pipe(flatten())
        .pipe(prefix({
            browsers: ['last 2 version', '> 1%'],
            cascade: true,
            remove: true
        }))
        .pipe(header(banner.full, { package : package }))
        .pipe(gulp.dest(paths.styles.output))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minify({
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(header(banner.min, { package : package }))
        .pipe(gulp.dest(paths.styles.output))
        .pipe(reload({ stream: true }));
});

// Generate SVG sprites
gulp.task('build:svgs', ['clean:dist'], function () {
    return gulp.src(paths.svgs.input)
        .pipe(plumber())
        .pipe(tap(function (file, t) {
            if ( file.isDirectory() ) {
                var name = file.relative + '.svg';
                return gulp.src(file.path + '/*.svg')
                    .pipe(svgmin())
                    .pipe(svgstore({
                        fileName: name,
                        prefix: 'icon-',
                        inlineSvg: true
                    }))
                    .pipe(gulp.dest(paths.svgs.output));
            }
        }))
        .pipe(svgmin())
        .pipe(gulp.dest(paths.svgs.output));
});

// Copy image files into output folder
gulp.task('build:images', ['clean:dist'], function() {
    return gulp.src(paths.images.input)
        .pipe(plumber())
        .pipe(gulp.dest(paths.images.output));
});

// Copy static files into output folder
gulp.task('build:static', ['clean:dist'], function() {
    return gulp.src(paths.static.input)
        .pipe(plumber())
        .pipe(gulp.dest(paths.static.output));
});

// Lint scripts
gulp.task('lint:scripts', function () {
    return gulp.src(paths.scripts.input)
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// Remove pre-existing content from output and test folders
gulp.task('clean:dist', function () {
    del.sync([
        paths.output
    ]);
});

// Remove pre-existing content from text folders
gulp.task('clean:test', function () {
    del.sync([
        paths.test.coverage,
        paths.test.results
    ]);
});

// Run unit tests
gulp.task('test:scripts', function() {
    return gulp.src([paths.test.input].concat([paths.test.spec]))
        .pipe(plumber())
        .pipe(karma({ configFile: paths.test.karma }))
        .on('error', function(err) { throw err; });
});

// Generate documentation
gulp.task('build:docs', ['compile', 'clean:docs'], function() {
    return gulp.src(paths.docs.input)
        .pipe(plumber())
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(tap(function (file, t) {
            if ( /\.md|\.markdown/.test(file.path) ) {
                return t.through(markdown);
            }
        }))
        .pipe(header(fs.readFileSync(paths.docs.templates + '/_header.html', 'utf8')))
        .pipe(footer(fs.readFileSync(paths.docs.templates + '/_footer.html', 'utf8')))
        .pipe(gulp.dest(paths.docs.output));
});

// Copy distribution files to docs
gulp.task('copy:dist', ['compile', 'clean:docs'], function() {
    return gulp.src(paths.output + '/**')
        .pipe(plumber())
        .pipe(gulp.dest(paths.docs.output + '/dist'));
});

// Copy documentation assets to docs
gulp.task('copy:assets', ['clean:docs'], function() {
    return gulp.src(paths.docs.assets)
        .pipe(plumber())
        .pipe(gulp.dest(paths.docs.output + '/assets'));
});

// Remove prexisting content from docs folder
gulp.task('clean:docs', function () {
    return del.sync(paths.docs.output);
});

// Browser-sync task, only cares about compiled CSS
gulp.task('browser-sync', function() {
    browserSync({
        files: [paths.styles.input, paths.scripts.input],
        server: {
            baseDir: "./docs/",
        },
    xip: true,
    online: true
    });
});

// Reload Browsersync
gulp.task('reload', ['build:styles'], function() {
  reload({ stream: false });
});

/**
 * Task Runners
 */

// Compile files
gulp.task('compile', [
    'lint:scripts',
    'clean:dist',
    'build:scripts',
    'build:styles',
    'build:images',
    'build:static',
    'build:svgs'
]);

// Generate documentation
gulp.task('docs', [
    'clean:docs',
    'build:docs',
    'copy:dist',
    'copy:assets'
]);

// Compile files and generate docs (default)
gulp.task('default', [
    'compile',
    'docs'
]);

// Compile files and generate docs when something changes
gulp.task('watch', [ 'default', 'browser-sync' ], function() {
    gulp.watch(paths.input).on('change', function (file) {
        gulp.start('default')
    });
});

// Run unit tests
gulp.task('test', [
    'default',
    'test:scripts'
]);