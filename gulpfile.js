var gulp = require('gulp'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin'),
    htmlReplace = require('gulp-html-replace'),
    rename = require('gulp-rename');

gulp.task('html', function () 
{
    return gulp.src('*.html')
               .pipe(htmlReplace({
                   style: '<link rel="stylesheet" href="style.min.css">',
                   jsEruda: '<script src="eruda.min.js"></script>',
                   jsEustia: '<script src="eustia.min.js"></script>',
                   fpsBtn: '<li id="fps-btn" class="purple" style="z-index: 80;" data-src="eruda-fps.min.js" ontouchstart>Load FPS Plugin</li>'
               })) 
               .pipe(htmlmin({
                   collapseWhitespace: true,
                   minifyJS: true
               }))
               .pipe(gulp.dest('dist'));
});

gulp.task('css', function () 
{
    return gulp.src('*.css')
               .pipe(cssmin())
               .pipe(rename({suffix: '.min'}))
               .pipe(gulp.dest('dist'));
});

gulp.task('js', function () 
{
    return gulp.src('*.js')
               .pipe(uglify())
               .pipe(rename({suffix: '.min'}))
               .pipe(gulp.dest('dist'));
});

gulp.task('copy', function () 
{
    var src = [
        'node_modules/eruda/eruda.min.js',
        'node_modules/eruda-fps/eruda-fps.min.js'
    ];

    return gulp.src(src)
               .pipe(gulp.dest('dist'));
});

gulp.task('default', ['html', 'css', 'js', 'copy']);