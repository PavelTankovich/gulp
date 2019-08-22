// Подключение зависимостей
const pathSass = 'app/sass/**/*.scss';
const pathHTML = 'app/*.html';
const pathScripts = [
    'app/libs/jquery/dist/jquery.min.js',
    'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
];

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const uglify = require('gulp-uglifyjs');

// Создание тасков

/**
 * таск перезагрузки страницы после изменений
 */
gulp.task('browser-sync', () => {
    browserSync({
        server : {
            baseDir : 'app',
        },
        notify : false,
    });
});

/**
 * таск преобразования sass => css
 */
gulp.task('code', () => {
    return gulp.src(pathHTML)
            .pipe(browserSync( {stream: true} ));
});

/**
 * таск преобразования sass => css
 */
gulp.task('sass', () => {
    return gulp.src(pathSass)
            .pipe(sass())
            .pipe(gulp.dest('app/css'))
            .pipe(browserSync.reload( {stream: true} )); // обновление после изменений
});

/**
 * таск преобразования объединения и минификации js файлов
 */
gulp.task('scripts', () => {
    return gulp.src(pathScripts)
            .pipe(concat('libs.min.js'))
            .pipe(uglify()) // минификация
            .pipe(gulp.dest('app/js'))
            .pipe(browserSync.reload( {stream: true} ));
});

/**
 * таск слежки за файлами
 */
gulp.task('watch', () => {
    gulp.watch(pathSass, gulp.parallel('sass'));
    gulp.wath(pathHTML, gulp.parallel('code'));
    gulp.watch(pathScripts, gulp.parallel('scripts'));
});

/**
 * таск запуска очереди выполнения тасков
 */
gulp.task('default', gulp.parallel('browser-sync', 'sass', 'scripts', 'watch'));
