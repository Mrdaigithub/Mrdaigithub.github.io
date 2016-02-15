//sass,js默认在source文件夹下
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    babel = require('gulp-babel'),
    browserSync = require('browser-sync').create(),
    reload      = browserSync.reload,
    uglify = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),
    concat = require('gulp-concat'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    sourcemaps = require("gulp-sourcemaps"),
    buffer = require('vinyl-buffer'),
    babelify = require('babelify');

//sass转css,合并压缩
gulp.task('sass', function () {
    return sass('css/*.scss')
        .on('error', sass.logError)
        .pipe(reload({stream: true}))
        .pipe(uglifycss({
            "max-line-len": 80
        }))
        .pipe(concat('all.min.css'))
        .pipe(gulp.dest('dist/'));
});
//js代码模块化,babel转化
//gulp.task('babel', function () {
//    browserify({
//        entries: ['item-pc/src/script.js'],
//        debug: true
//    })
//        .transform("babelify", {presets: ["es2015"]})
//        .bundle()
//        .pipe(source('bundle.js'))
//        .pipe(buffer())
//        .pipe(sourcemaps.init({loadMaps: true}))
//        .pipe(sourcemaps.write('.'))
//        .pipe(gulp.dest('./item-pc/result'))
//});
//babel转化压缩合并js代码
gulp.task('js', function () {
    return gulp.src('js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('dist'));
});
//监控代码模块化，es6
gulp.task('watchjs', function () {
    gulp.watch('item-pc/src/*.js',['babel']);
});

// 静态服务器
gulp.task('default',  ['sass','js'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("css/*.scss", ['sass']);
    gulp.watch("js/*.js", ['js']);
    gulp.watch("index.html").on('change', reload);
    gulp.watch("dist/*.*").on('change', reload);
});