var gulp   = require("gulp");

var server = require("gulp-server-livereload");
var useref = require("gulp-useref");
var gulpif = require("gulp-if");
var uglify = require("gulp-uglify");
var imagemin = require('gulp-imagemin');
 
var imgSrc = 'src/images/**';
var imgDest = 'build/images';

gulp.task('server', function() {
  gulp.src('app')
    .pipe(server({
      livereload: true,
      open: true
    }));
});

gulp.task('default', () =>
    gulp.src('app/images/**/*.*')
        .pipe(imagemin([imagemin.gifsicle(), imagemin.jpegtran(), imagemin.optipng(), imagemin.svgo()]))
        .pipe(gulp.dest('build/images'))
);

//build task
gulp.task('build', ['default'] ,function () {
    gulp.src('./app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulp.dest('build'));
});
