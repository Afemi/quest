var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify');
var imagemin = require('gulp-imagemin');
 
gulp.task('compress', function() {
  gulp.src('src/*.js')
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('build'))
});

gulp.task('sass', function () {
  return gulp.src('src/*.sass')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('build'));
});

gulp.task('testmove', function() {
    return gulp.src('src/*.sass').
    pipe(gulp.dest('build'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('src/*.sass', ['sass']);
});

gulp.task('js:watch', function () {
  gulp.watch('src/*.js', ['compress']);
});

gulp.task('imgmin', () =>
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'))
);

gulp.task('default', function() {
    gulp.start('sass', 'sass:watch', 'compress', 'js:watch', 'imgmin');
});

