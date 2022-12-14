// jshint esversion:6
var gulp = require('gulp');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var concat = require('gulp-concat');

var sass = require('gulp-sass')(require('sass'));
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var changed = require('gulp-changed');
// PostCSS and its plugins:
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
// Web server and HTTP:
var webserver = require('gulp-webserver');
var http = require('http');
// Images processing:
var gm = require('gulp-gm');
var imagemin = require('gulp-imagemin');

/*=======================
 * HTML and CSS
 *=======================
 */
// Build CSS - for Release
gulp.task('css', function() {
  var plugins = [
    // Using .browserslistrc file.
    // Otherwise change browsers list here:
    //autoprefixer({browsers: ['last 1 version']}),
    autoprefixer(),
    //cssnano()  // eats too many useful properties
  ];
  return gulp.src('./scss/*.scss')
    .pipe(sass({
               errorLogToConsole: true,
               outputStyle: 'compressed'     // uncomment to turn on compression
    }))
    .pipe(postcss(plugins))
    //.on('error', console.error.bind(console)) // error output to console
    .pipe(gulp.dest('./dist/css/'));
});
// Build CSS - for Development
gulp.task('dev-css', function() {
  return gulp.src('./scss/*.scss')
    .pipe(sass({
               errorLogToConsole: true,
    }))
    //.on('error', console.error.bind(console)) // error output to console
    .pipe(gulp.dest('./dist/css/'));
});

// Build HTML
gulp.task('html', function() {
  return gulp.src('./html/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist'));
});

/*====================
 * JavaScript
 *====================
 */
gulp.task('dev-js', function () {
  return gulp.src(['javascript/utils.js', 'javascript/main.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js/'));
});
gulp.task('js', function () {
  return gulp.src(['javascript/utils.js', 'javascript/main.js'])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
});
gulp.task('js-libs', function () {
  return gulp.src('javascript/ie8fix.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
});
/*====================
 * Fonts
 *====================
 */
gulp.task('fonts', function () {
  return gulp.src(['fonts/*', '!fonts/*.txt'])
    .pipe(gulp.dest('dist/fonts/'));
});

/*====================
 * Images, pictures
 *====================
 */
// Must be called before all other 'bg-image-xx' tasks
gulp.task('image-recode', function() {
  return gulp.src('raw-images/guitar_shaded_bg-1920x1272.png')
    //Ensure files that are the same don't get re-converted
    //.pipe(changed('dist/images'))
    .pipe(gm(function(gmfile) {
      return gmfile.setFormat('jpg');
    }))
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});
gulp.task('image-resize', function() {
  return gulp.src('dist/images/guitar_shaded_bg-1920x1272.jpg')
    //Ensure files that are the same don't get re-converted
    //.pipe(changed('dist/images'))
    .pipe(gm(function(gmfile) {
      return gmfile.resize(800, 530).setFormat('jpg');
    }))
    .pipe(imagemin())
    .pipe(rename({
                    basename: 'guitar_shaded_bg',
                    suffix: '-800x530'
    }))
    .pipe(gulp.dest('dist/images'));
});
gulp.task('favicon', function() {
  return gulp.src('raw-images/favicon.png')
    .pipe(gm(function(gmfile) {
      return gmfile.resize(32, 32);
    }))
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});
/*======================
 * Clean up dist folder
 *======================
 */
gulp.task('clean', function(done) {
  return gulp.src(['dist/{images,css,fonts,js}/*', 'dist/*.html'])
  .pipe(clean());
});
/*====================
 * Web server
 *====================
 */
// Start web server for development or testing
gulp.task('server', function(done) {
  stream = gulp.src('dist')
    .pipe(webserver({
      livereload: false,
      directoryListing: false,
      open: true,
      port: 8000,
      middleware: function(req, res, next) {
        if (/_kill_\/?/.test(req.url)) {
          res.end();
          stream.emit('kill');
        }
        next();
      }
  }));
  return stream;
});
// Stop web server
gulp.task('server-stop', function(done) {
  http.request('http://localhost:8000/_kill_')
    .on('close', done)
    .end();
});

/*================================
 * Main tasks (composite)
 *================================
 */
// Make images
gulp.task('images', gulp.series(['image-recode', 'image-resize', 'favicon']));
// Build for development
gulp.task('build', gulp.parallel(['dev-css', 'html', 'dev-js']));
//Full build for release
gulp.task('release', gulp.parallel(['css', 'html', 'images', 'fonts', 'js',
                                    'js-libs']));

