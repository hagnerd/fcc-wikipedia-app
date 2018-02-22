const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const cleanCSS = require('gulp-clean-css');
const souremaps = require('gulp-sourcemaps');
const shell = require('gulp-shell')

gulp.task('sass', () => {
  gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream())
});

gulp.task('browser-sync', function(){
  browserSync.init({
    server: './dist',
    nofify: false,
    open: false
  })
});

gulp.task('sass:minify', () => {
  gulp.src('./dist/css/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css'))
});

gulp.task('webpack', () => {
  gulp.src('*.js', { read: false })
    .pipe(shell([
      'webpack'
    ]))
    .pipe(browserSync.stream())
});

gulp.task('production', ['sass:minify']);

gulp.task('default', ['sass', 'webpack',  'browser-sync'], function(){
  gulp.watch('./src/scss/**/*', ['sass'])
  gulp.watch('./src/js/**/*', ['webpack'])
});

