// Подключение зависимостей
const pathSass = 'app/sass/**/*.scss';

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');

// Создание тасков
// gulp.task('mytask', () => {});

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
 * таск слежки за файлами
 */
gulp.task('watch', () => {
    gulp.watch(pathSass, gulp.parallel('sass'));
});

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
 * таск запуска очереди выполнения тасков
 */
gulp.task('default', gulp.parallel('browser-sync', 'sass', 'watch'));
