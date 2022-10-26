const gulp = require('gulp')
const sass = require('gulp-sass')(require('node-sass'))
const babel = require('gulp-babel')
const sourcemaps = require('gulp-sourcemaps')
const concat = require('gulp-concat')
const plumber = require('gulp-plumber')
const rimraf = require('rimraf')

const buildScripts = () => {
  return gulp
    .src('./src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(concat('build.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public'))
}

const buildStyles = () => {
  return gulp
    .src('./src/**/*.scss')
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('./public'))
}

const watch = () => {
  gulp.watch('./src/**/*.scss', buildStyles)
  gulp.watch('./src/**/*.js', buildScripts)
}

const clean = async () => {
  rimraf('./public/build.js', () => {})
  rimraf('./public/styles.css', () => {})
}

exports.buildStyles = buildStyles
exports.buildScripts = buildScripts
exports.clean = clean
exports.build = gulp.series(clean, gulp.parallel(buildStyles, buildScripts))
exports.default = gulp.series(clean, gulp.parallel(buildStyles, buildScripts), watch)