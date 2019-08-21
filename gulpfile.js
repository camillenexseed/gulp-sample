'use strict';
//gulp
const gulp = require('gulp');
//sass
const sass = require('gulp-sass');
// media query
const mq = require('gulp-combine-mq');
// errror
const plumber = require('gulp-plumber');
// notify
const notify = require('gulp-notify');
// browserSync
const browserSync = require('browser-sync');

sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp.src(['./sass/*.scss', './sass/**/*.scss'], { sourcemaps: true })
    .pipe(sass({
      outputStyle: 'compressed',
    }))
    //エラーの処理
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    //メディアクエリを一つにまとめる
    .pipe(mq({
      beautify: false
    }))
    // mapの出力
    .pipe(gulp.dest('./css', { sourcemaps: './maps' }))
    .pipe(browserSync.reload({ stream: true }))
    ;
});

// SASSのウオッチ
gulp.task('sass:watch', function () {
  gulp.watch(['./sass/*.scss', './sass/**/*.scss'], gulp.series('sass')).on('change', browserSync.reload);
});


// HTMLのウオッチ
gulp.task('html:watch', function () {
  gulp.watch(['./*.html', './**/*.html']).on('change', browserSync.reload);
});

//ブラウザシンク
gulp.task('bs', function () {
  browserSync({
    server: {
      baseDir: './',
      index: 'index.html'
    },
    open: true,
    browser: ["chrome"]
  })
})

// gulpで動く
gulp.task('default', gulp.parallel('html:watch', 'bs', 'sass:watch')
);
