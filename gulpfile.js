// aliases
var gulp = require('gulp'),
    less = require('gulp-less'),
    ts = require('gulp-typescript'),
    concat = require('gulp-concat'),
    jsmin = require('gulp-minify'),
    path = require('path');

// variables
var destination = './public',
    less_sources = './src/less/**/*.less',
    less_watch = less_sources,
    ts_config = './tsconfig.json',
    ts_sources = './src/typescript/**/*.ts',
    ts_watch = ts_sources;

// default task
gulp.task('default', ['less', 'typescript']);

// watcher
gulp.task('watch', function () {
    gulp.watch(less_watch, ['less']);
    gulp.watch(ts_watch, ['typescript']);
});

// less
gulp.task('less', function () {
    return gulp.src(less_sources)
        .pipe(less({
            paths: [
                path.join(__dirname, 'less', 'includes')
            ],
            compress: true
        }))
        .pipe(concat('app.css'))
        .pipe(gulp.dest(destination));
});

// typescript
gulp.task('typescript', function () {
    var tsProject = ts.createProject(ts_config);

    return gulp.src(ts_sources)
        .pipe(ts(tsProject))
        .pipe(jsmin({
            ext: {
                src: '-',
                min: '.js'
            },
            noSource: true
        }))
        .pipe(gulp.dest(destination));
});
