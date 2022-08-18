const autoPrefixer = require('autoprefixer')
const cleanCss = require('gulp-clean-css')
const gulp = require('gulp')
const postCss = require('gulp-postcss')
const rename = require('gulp-rename')
const shell = require('gulp-shell')
const sizereport = require('gulp-sizereport')
const sourcemaps = require('gulp-sourcemaps')
const stringReplace = require('gulp-replace')

const newVersion = '1.0.1'
const distCssPath = 'dist'

/*
 * Scripts
 */

gulp.task('build-weavv-full', shell.task('sass --quiet --no-source-map ./src/full.scss ./dist/weavv-' + newVersion + '.css'))
gulp.task('build-weavv-min', shell.task('sass --quiet --no-source-map ./src/minimal.scss ./dist/weavv-' + newVersion + '.css'))
gulp.task('build-weavv-test', shell.task('sass --quiet --no-source-map ./src/test.scss ./dist/weavv-' + newVersion + '.css'))

gulp.task('clean', shell.task('rm -rfv ./weavv.scss ./dist/*'))

/*
 * Post-Processing
 */

gulp.task('postprocessing:autoprefix-css', () => {
  return gulp.src(distCssPath + '/weavv-' + newVersion + '.css')
    .pipe(sourcemaps.init())
    .pipe(postCss([autoPrefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(distCssPath))
})
const minifiedOutput = 'weavv-' + newVersion + '.min.css'
gulp.task('postprocessing:minify-css', () => {
  return gulp.src(distCssPath + '/weavv-' + newVersion + '.css')
    .pipe(sourcemaps.init())
    .pipe(cleanCss())
    .pipe(rename(minifiedOutput))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(distCssPath))
})
gulp.task('postprocessing:extra-scss', () => {
  return gulp.src(distCssPath + '/' + minifiedOutput)
    .pipe(rename('./weavv.scss'))
    .pipe(gulp.dest('./'))
})

/*
 * Versioning
 */

const { version } = require('./package.json')
gulp.task('versioning:package-json', () => {
  return gulp.src('./package.json')
    .pipe(stringReplace(version, newVersion))
    .pipe(gulp.dest('.'))
})
gulp.task('versioning:weavv-full', () => {
  return gulp.src('./src/full.scss')
    .pipe(stringReplace(version, newVersion))
    .pipe(gulp.dest('./src/'))
})
gulp.task('versioning:weavv-min', () => {
  return gulp.src('./src/minimal.scss')
    .pipe(stringReplace(version, newVersion))
    .pipe(gulp.dest('./src/'))
})
gulp.task('versioning:readme-md', () => {
  return gulp.src('./README.md')
    .pipe(stringReplace(version, newVersion))
    .pipe(gulp.dest('.'))
})

/*
 * Dirty Clean Ups
 */

gulp.task('cleanup:dist', () => {
  return gulp.src('./dist/weavv-' + newVersion + '.css')
    .pipe(stringReplace('.trashflexgaptoberemoved', '>*'))
    .pipe(stringReplace('trashscrollsnap', '>*'))
    .pipe(stringReplace('trashdissect', '>:not(template)~:not(template)'))
    .pipe(stringReplace('trashequal', '>:not(template)~:not(template)'))
    .pipe(stringReplace('trashscrollbarsize', '::-webkit-scrollbar'))
    .pipe(stringReplace('trashscrollbarradius', '::-webkit-scrollbar-thumb'))
    .pipe(stringReplace(':selection-hover', ':hover>*:not(:hover)'))
    .pipe(stringReplace(':expand', '>*'))
    .pipe(stringReplace(':first-of-type', '>*:first-of-type'))
    .pipe(stringReplace('(first-of-type', '(first'))
    .pipe(stringReplace(':last-of-type', '>*:last-of-type'))
    .pipe(stringReplace('(last-of-type', '(last'))
    .pipe(stringReplace(':child-1', '>*:nth-child(1)'))
    .pipe(stringReplace(':child-2', '>*:nth-child(2)'))
    .pipe(stringReplace(':child-3', '>*:nth-child(3)'))
    .pipe(stringReplace(':child-4', '>*:nth-child(4)'))
    .pipe(stringReplace(':child-5', '>*:nth-child(5)'))
    .pipe(sizereport({ gzip: true }))
    .pipe(gulp.dest('./dist/'))
})
gulp.task('cleanup:dist-min', () => {
  return gulp.src('./dist/weavv-' + newVersion + '.min.css')
    .pipe(stringReplace('.trashflexgaptoberemoved', '>*'))
    .pipe(stringReplace('trashscrollsnap', '>*'))
    .pipe(stringReplace('trashdissect', '>:not(template)~:not(template)'))
    .pipe(stringReplace('trashequal', '>:not(template)~:not(template)'))
    .pipe(stringReplace('trashscrollbarsize', '::-webkit-scrollbar'))
    .pipe(stringReplace('trashscrollbarradius', '::-webkit-scrollbar-thumb'))
    .pipe(stringReplace(':selection-hover', ':hover>*:not(:hover)'))
    .pipe(stringReplace(':expand', '>*'))
    .pipe(stringReplace(':first-of-type', '>*:first-of-type'))
    .pipe(stringReplace('(first-of-type', '(first'))
    .pipe(stringReplace(':last-of-type', '>*:last-of-type'))
    .pipe(stringReplace('(last-of-type', '(last'))
    .pipe(stringReplace(':child-1', '>*:nth-child(1)'))
    .pipe(stringReplace(':child-2', '>*:nth-child(2)'))
    .pipe(stringReplace(':child-3', '>*:nth-child(3)'))
    .pipe(stringReplace(':child-4', '>*:nth-child(4)'))
    .pipe(stringReplace(':child-5', '>*:nth-child(5)'))
    .pipe(sizereport({ gzip: true }))
    .pipe(gulp.dest('./dist/'))
})
gulp.task('cleanup:dist-scss', () => {
  return gulp.src('./weavv.scss')
    .pipe(stringReplace('.trashflexgaptoberemoved', '>*'))
    .pipe(stringReplace('trashscrollsnap', '>*'))
    .pipe(stringReplace('trashdissect', '>:not(template)~:not(template)'))
    .pipe(stringReplace('trashequal', '>:not(template)~:not(template)'))
    .pipe(stringReplace('trashscrollbarsize', '::-webkit-scrollbar'))
    .pipe(stringReplace('trashscrollbarradius', '::-webkit-scrollbar-thumb'))
    .pipe(stringReplace(':selection-hover', ':hover>*:not(:hover)'))
    .pipe(stringReplace(':expand', '>*'))
    .pipe(stringReplace(':first-of-type', '>*:first-of-type'))
    .pipe(stringReplace('(first-of-type', '(first'))
    .pipe(stringReplace(':last-of-type', '>*:last-of-type'))
    .pipe(stringReplace('(last-of-type', '(last'))
    .pipe(stringReplace(':child-1', '>*:nth-child(1)'))
    .pipe(stringReplace(':child-2', '>*:nth-child(2)'))
    .pipe(stringReplace(':child-3', '>*:nth-child(3)'))
    .pipe(stringReplace(':child-4', '>*:nth-child(4)'))
    .pipe(stringReplace(':child-5', '>*:nth-child(5)'))
    .pipe(sizereport({ gzip: true }))
    .pipe(gulp.dest('.'))
})

/*
 * Grouped Tasks
 */

gulp.task('post-processing', gulp.series(
  'postprocessing:autoprefix-css',
  'postprocessing:minify-css',
  'postprocessing:extra-scss',
))

gulp.task('versioning', gulp.series(
  'versioning:package-json',
  'versioning:weavv-full',
  'versioning:weavv-min',
  'versioning:readme-md'
))

gulp.task('cleanup', gulp.series(
  'cleanup:dist',
  'cleanup:dist-min',
  'cleanup:dist-scss'
))

/*
 * Main Tasks
 */

gulp.task('build-full', gulp.series(
  'build-weavv-full',
  'versioning',
  'post-processing',
  'cleanup'
))

gulp.task('build-min', gulp.series(
  'build-weavv-min',
  'post-processing',
  'cleanup'
))

gulp.task('build-test', gulp.series(
  'build-weavv-test',
  'versioning',
  'post-processing',
  'cleanup'
))

