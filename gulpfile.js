
var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass')(require('sass'));
var htmlmin = require('gulp-htmlmin');
// PostCSS and its plugins:
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
// Web server and HTTP
var webserver = require('gulp-webserver');
var http = require('http');

/*
 * Build CSS - for Release
 */
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
    .pipe(rename({suffix: '.min'}))
    //.on('error', console.error.bind(console)) // error output to console
    .pipe(gulp.dest('./dist/css/'));
});
/*
 * Build CSS - for Development
 */
gulp.task('dev-css', function() {
  return gulp.src('./scss/*.scss')
    .pipe(sass({
               errorLogToConsole: true,
    }))
    .pipe(rename({suffix: '.min'}))
    //.on('error', console.error.bind(console)) // error output to console
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('html', function() {
  return gulp.src('./html/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist'));
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
// Build for development
gulp.task('build', gulp.parallel(['dev-css', 'html']));
//Full build for release
gulp.task('release', gulp.parallel(['css', 'html']));

