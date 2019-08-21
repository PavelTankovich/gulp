/** Подключение зависимостей */
const gulp = require('gulp');
const sass = require('gulp-sass');

/** Создание тасков
* gulp.task('mytask', () => {});
*/
gulp.task('sass', () => {
    return gulp.src('app/sass/main.scss')
            .pipe(sass())
            .pipe(gulp.dest('app/css'));
});
