//sass,js默认在source文件夹下
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    babel = require('gulp-babel'),
    browserSync = require('browser-sync').create(),
    reload      = browserSync.reload,
    uglify = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer');
    //browserify = require('browserify'),
    //source = require('vinyl-source-stream'),
    //sourcemaps = require("gulp-sourcemaps"),
    //buffer = require('vinyl-buffer'),
    //babelify = require('babelify');

//最后执行
gulp.task('default', ['mincss','minjs'], function () {
});

gulp.task('mincss', function () {
    gulp.src('result/css/*.css')
        .pipe(uglifycss({
            "max-line-len": 80
        }))
        .pipe(concat('all.min.css'))
        .pipe(gulp.dest('result/min/'));
});
//压缩合并js代码
gulp.task('minjs', function() {
    return gulp.src('result/js/*.js')
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('result/min/'));
});
//sass转css
gulp.task('sass', function () {
    return sass('sass/*.scss')
        .on('error', sass.logError)
        .pipe(gulp.dest('result/css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(reload({stream: true}))
});

gulp.task('watchjs', () => {
    return gulp.src('js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('result/js'));
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
////监控代码模块化，es6
//gulp.task('watchjs', function () {
//    gulp.watch('item-pc/src/*.js',['babel']);
//});

// 静态服务器
gulp.task('watchSass',  ['sass','watchjs','mincss','minjs'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("sass/*.scss", ['sass']);
    gulp.watch("js/*.js",['watchjs']);
    gulp.watch("result/css/*.css",['mincss']);
    gulp.watch("result/js/*.js",['minjs']);
    gulp.watch("index.html").on('change', reload);
    gulp.watch("result/**/*.*").on('change', reload);
});