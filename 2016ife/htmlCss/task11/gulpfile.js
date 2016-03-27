//sass,js默认在source文件夹下
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    //babel = require('gulp-babel'),
    reload      = browserSync.reload,
    //uglify = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss');
    //concat = require('gulp-concat'),
    //browserify = require('browserify'),
    //source = require('vinyl-source-stream'),
    //sourcemaps = require("gulp-sourcemaps"),
    //buffer = require('vinyl-buffer'),
    //babelify = require('babelify');

//最后执行
//gulp.task('default', ['mincss','minjs'], function () {
//});
//
//压缩合并js代码
//gulp.task('minjs', function() {
//    return gulp.src('item-pc/result/*.js')
//        .pipe(uglify())
//        .pipe(concat('all.min.js'))
//        .pipe(gulp.dest('item-pc/result/min/'));
//});
//css处理
gulp.task('sass', function () {
    return gulp.src('*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions','Android >= 4.0','> 5%'],
            cascade: true,
            remove:true
        }))
        .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
        }))
        .pipe(gulp.dest('./css/'));
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
//监控代码模块化，es6
//gulp.task('watchjs', function () {
//    gulp.watch('item-pc/src/*.js',['babel']);
//});

// 静态服务器
gulp.task('watchSass',  ['sass'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("*.scss", ['sass']);
    gulp.watch("./css/*.css").on('change', reload);
    gulp.watch("./index.html").on('change', reload);
});