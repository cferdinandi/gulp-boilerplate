var gulp    = require('gulp'),
    karma   = require('gulp-karma'),
    jshint  = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    header  = require('gulp-header'),
    uglify  = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    clean   = require('gulp-clean'),
    rename  = require('gulp-rename'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    minify = require('gulp-minify-css'),
    package = require('./package.json');

var paths = {
  output : 'dist/',
  scripts : {
    input: [ 'src/**/*.js' ],
    output: 'dist/js/'
  },
  styles : {
    input: 'src/sass/*.scss',
    output: 'dist/css/'
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
  ' <%= package.name %> v<%= package.version %>' +
  ' | <%= package.repository.url %>' +
  ' | MIT Licensed http://gomakethings.com/mit/' +
  ' */\n';

gulp.task('scripts', ['clean'], function() {
  return gulp.src(paths.scripts.input)
    .pipe(plumber())
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
  return gulp.src(paths.output, { read: false })
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