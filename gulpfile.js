'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var mq = require('gulp-combine-mq');

sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp.src(['./sass/*.scss', './sass/**/*.scss'], { sourcemaps: true })
    .pipe(sass({
      // outputStyle: 'compressed',
      outputStyle: 'nested',
    }))
    .pipe(mq({
      beautify: false
    }))
    .pipe(gulp.dest('./css', { sourcemaps: './maps' }))
    ;
});

gulp.task('sass:watch', function () {
  gulp.watch(['./sass/*.scss', './sass/**/*.scss'], gulp.series('sass'));
});
