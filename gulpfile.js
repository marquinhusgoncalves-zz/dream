var gulp = require('gulp'),
    jade = require("gulp-jade"),
    sass = require('gulp-ruby-sass'),
    autoprefix = require('gulp-autoprefixer'),
    nano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    notify = require("gulp-notify"),
    bower = require('gulp-bower');

var config = {
    jadePath: './jade',
    scssPath: './scss',
    bowerDir: './bower_components'
}

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(config.bowerDir));
});

gulp.task('icons', function() {
    return gulp.src([config.bowerDir + '/font-awesome/fonts/**.*', config.bowerDir + '/bootstrap-sass/assets/fonts/bootstrap/**.*'])
    // return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*',)
        .pipe(gulp.dest('./fonts'))
        .pipe(notify({ message: 'Icons task complete' }));
});

// gulp.task('jade', function () {
//     return gulp.src(config.jadePath + '/**/*.jade')
//         .pipe(jade({
//             pretty: true
//         }))
//         .pipe(gulp.dest('./'))
//         .pipe(notify({ message: 'Jade task complete' }));
// });

gulp.task('styles', function() {
	return sass(config.scssPath + '/style.scss', {
        noCache: true,
        style: 'expanded',
        sourcemap: false,
        compass: true,
        loadPath: [
            './scss',
            config.bowerDir + '/bootstrap-sass/assets/stylesheets',
            config.bowerDir + '/font-awesome/scss',
        ]
    })
        .on("error", notify.onError(function (error) {
            return "Error: " + error.message;
        }))
    .pipe(autoprefix('last 2 version'))
    .pipe(gulp.dest('./css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(nano())
    .pipe(gulp.dest('./css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('images', function() {
  return gulp.src('images/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('img/'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    // gulp.watch(config.jadePath + '/**/*.jade', ['jade']);
    gulp.watch(config.scssPath + '/**/*.scss', ['styles']);
    gulp.watch('images/*', ['images']);
});

gulp.task('default', function() {
    gulp.start(['bower', 'styles', 'icons', 'images', 'watch']);
});