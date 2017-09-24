/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    clean = require('gulp-clean'),
    path = require('path'),
    filter = require('gulp-filter'),
    print = require('gulp-print'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint');

var browserSync = require('browser-sync').create();

// config
var paths = {
	src: 'client',
    tmp: '.tmp',
	dist: '.tmp/client',
    bower: 'bower_components',
    assets: 'client/assets',
    clientTests: 'client-tests'
}


// define the default task, build and serve locally
gulp.task('default', ['build','serve']);

// configure the jshint task
gulp.task('jslint', function() {
  return gulp.src(path.join( paths.src, '/**/*.js' ))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('wjslint', ['jslint'], function() {
  gulp.watch(path.join( paths.src, '/**/*.js' ), ['jslint']);
});

// clean up
gulp.task('clean', function() {
	return gulp.src( [ paths.tmp ] , {read: false}).pipe(clean());
});

// local build
gulp.task('build', function() {
	gulp.src(path.join( paths.assets, '/**/*.jpg')).pipe(gulp.dest( path.join( paths.dist, '/img' )));
    gulp.src(path.join( paths.src, '/**/*.html')).pipe(gulp.dest( paths.dist ));
	gulp.src(path.join( paths.src, '/**/*.js')).pipe(gulp.dest( paths.dist ));
    gulp.src(path.join( paths.clientTests, '/**/*')).pipe(gulp.dest( path.join( paths.dist, '/tests' ) ));
});

// serve the files locally

gulp.task('serve', [], function() {

    browserSync.init({
        server: paths.dist
    });

    // watch the source directories - rebuild on change
    gulp.watch( path.join( paths.src, '/**/*' ) , ['jslint','build']);
    gulp.watch( path.join( paths.clientTests, '/**/*' ) , ['build']);
    gulp.watch(path.join( paths.dist, '/**/*' )).on('change', browserSync.reload);    
});