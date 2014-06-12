var gulp = require('gulp');
var plumber = require('gulp-plumber');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var flatten = require('gulp-flatten');
var header = require('gulp-header');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var karma = require('gulp-karma');
var package = require('./package.json');

var paths = {
	scripts : {
		input: [ 'js/components/**/*.js' ],
		output: 'js/'
	},
	styles : {
		input: 'sass/**/*.scss',
		output: 'css/'
	},
	test: [ 'test/spec/**/*.js' ]
};

var banner =
	'/**\n' +
	' * <%= package.name %> v<%= package.version %>\n' +
	' * <%= package.description %>, by <%= package.author.name %>.\n' +
	' * <%= package.repository.url %>\n' +
	' * \n' +
	' * Free to use under the MIT License.\n' +
	' * http://gomakethings.com/mit/\n' +
	' */\n\n';

var bannerMin =
	'/**' +
	' <%= package.name %> v<%= package.version %>, by Chris Ferdinandi' +
	' | <%= package.repository.url %>' +
	' | Licensed under MIT: http://gomakethings.com/mit/' +
	' */\n';

gulp.task('scripts', ['clean'], function() {
	return gulp.src(paths.scripts.input)
		.pipe(plumber())
		.pipe(flatten())
		.pipe(concat('main.js'))
		.pipe(header(banner, { package : package }))
		.pipe(gulp.dest(paths.scripts.output))
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(header(bannerMin, { package : package }))
		.pipe(gulp.dest(paths.scripts.output));
});

gulp.task('styles', ['clean'], function() {
	return gulp.src(paths.styles.input)
		.pipe(plumber())
		.pipe(sass())
		.pipe(flatten())
		.pipe(prefix('last 2 version', '> 1%'))
		.pipe(header(banner, { package : package }))
		.pipe(gulp.dest(paths.styles.output))
		.pipe(rename({ suffix: '.min' }))
		.pipe(minify())
		.pipe(header(bannerMin, { package : package }))
		.pipe(gulp.dest(paths.styles.output));
});

gulp.task('lint', function () {
	return gulp.src(paths.scripts.input)
		.pipe(plumber())
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('clean', function () {
	return gulp.src([
			paths.scripts.output + 'main.js',
			paths.scripts.output + 'main.min.js',
			paths.styles.output
		], { read: false })
		.pipe(plumber())
		.pipe(clean());
});

gulp.task('test', function() {
	return gulp.src(paths.scripts.input.concat(paths.test))
		.pipe(plumber())
		.pipe(karma({ configFile: 'test/karma.conf.js' }))
		.on('error', function(err) { throw err; });
});

gulp.task('default', [
	'lint',
	'clean',
	'scripts',
	'styles',
	'test'
]);