/** Подключение зависимостей */
const pathSass = 'app/sass/**/*.scss';

const gulp = require('gulp');
const sass = require('gulp-sass');

/** Создание тасков
* gulp.task('mytask', () => {});
*/
gulp.task('sass', () => {
    return gulp.src(pathSass)
            .pipe(sass())
            .pipe(gulp.dest('app/css'));
});

gulp.task('watch', () => {
    gulp.watch(pathSass, gulp.parallel('sass'));
})
