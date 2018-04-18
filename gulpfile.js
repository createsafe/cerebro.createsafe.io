var gulp = require('gulp')
var browserSync = require('browser-sync')
var pug = require('gulp-pug')
var changed = require('gulp-changed')
var flatten = require('gulp-flatten')
// var minifyCSS = require('gulp-csso')

var paths = {
  dirs: {
    build: 'build'
  }
}

// -- JS --

gulp.task('js', function () {
  return gulp.src('+(pages|js)/**/*.js')
    .pipe(flatten())
    .pipe(changed(paths.dirs.build))
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.reload({stream: true}))
})

// -- MEDIA --

gulp.task('media', function () {
  return gulp.src('media/**/*')
    .pipe(changed(paths.dirs.build))
    .pipe(gulp.dest('build/media'))
    .pipe(browserSync.reload({stream: true}))
})

// -- FONTS --

gulp.task('fonts', function () {
  return gulp.src('fonts/**/*')
    .pipe(flatten())
    .pipe(changed(paths.dirs.build))
    .pipe(gulp.dest('build/fonts'))
    .pipe(browserSync.reload({stream: true}))
})

// -- CSS --

gulp.task('css', function () {
  return gulp.src('css/**/*')
    // .pipe(less())
    // .pipe(minifyCSS())
    .pipe(changed(paths.dirs.build))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({stream: true}))
})

// -- PUG --

gulp.task('pug', function () {
  return gulp.src('pages/**/*.pug')
    .pipe(pug({
      basedir: '.'
    }))
    // .pipe(changed(paths.dirs.build))
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.reload({stream: true}))
})

// gulp.task('pug:all', function () {
//   return gulp.src('pages/**/*.pug')
//     .pipe(pug({
//       basedir: '.'
//     }))
//     .pipe(gulp.dest('build/'))
//     .pipe(browserSync.reload({stream: true}))
// })

// -- SERVE --

gulp.task('serve', function (cb) {
  browserSync({
    server: {
      baseDir: './build'
    }
  }, cb)
})

gulp.task('watch', function () {
  gulp.watch('pages/**/*.pug', gulp.series('pug'))
  gulp.watch('templates/**/*.pug', gulp.series('pug'))
  gulp.watch('css/**/*.css', gulp.series('css'))
  gulp.watch('+(pages|js)/**/*', gulp.series('js'))
})

gulp.task('build', gulp.series('fonts', 'css', 'js', 'pug', 'media'))
gulp.task('default', gulp.series('build', 'serve', 'watch'))
