// Подключение зависимостей
//app
const pathSass = 'app/sass/**/*.scss';
const pathHTML = 'app/*.html';
const pathScripts = [
    'app/libs/jquery/dist/jquery.min.js',
    'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
];
const pathCSS = [
    'app/css/main.css',
    'app/libs/magnific-popup/dist/magnific-popup.css'
];
const pathMinCSS = 'app/css/libs.min.css';
const pathMinScripts = 'app/js/**/*';
const pathImage = 'app/img/**/*';
const pathFonts = 'app/fonts/**/*';

// dist
const prodImage = 'dist/img/';
const prodCSS = 'dist/css/';
const prodFonts = 'dist/fonts/';
const prodScripts = 'dist/js/';
const prodHTML = 'dist/';

// пакеты
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const uglify = require('gulp-uglifyjs');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const cache = require('gulp-cache');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');

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
 * таск наблюдения за html
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
            .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
            .pipe(gulp.dest('app/css'))
            .pipe(browserSync.reload( {stream: true} )); // обновление после изменений
});

/**
 * таск объединения и минификации css файлов
 */

gulp.task('css-libs', () => {
    return gulp.src(pathCSS)
            .pipe(concat('libs.min.css'))
            .pipe(cssnano()) // минификация
            .pipe(gulp.dest('app/css'));
});

/**
 * таск минификации картинок
 */
gulp.task('image', () => {
    return gulp.src(pathImage)
            .pipe( cache(
                    imagemin({
                        interlaced: true,
                        progressive: true,
                        svgoPlugins: [{removeViewBox: false}],
                        use: [pngquant()]
                    })
            ) )
            .pipe(gulp.dest(prodImage));
});

/**
 * таск объединения и минификации js файлов
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
    gulp.watch(pathCSS , gulp.parallel('css-libs'));
    gulp.watch(pathHTML, gulp.parallel('code'));
    gulp.watch(pathScripts, gulp.parallel('scripts'));
});

/**
 * таск очистки папки dist перед выгрузкой в продакшн
 */
gulp.task('clean', function () {
    return del.sync('dist');
})

/**
 * таск очистки кэша
 */
gulp.task('clear', function () {
    return cache.clearAll();
})

/**
 * таск запуска очереди выполнения тасков
 */
gulp.task('default', gulp.parallel('browser-sync', 'sass', 'css-libs', 'scripts', 'watch'));

/**
 * таск выгрузки в продакшн
 */
gulp.task('prebuild', () => {
    gulp.src(pathMinCSS)
        .pipe(gulp.dest(prodCSS));

    gulp.src(pathFonts)
        .pipe(gulp.dest(prodFonts));

    gulp.src(pathMinScripts)
        .pipe(gulp.dest(prodScripts));

    gulp.src(pathHTML)
        .pipe(gulp.dest(prodHTML));
});

gulp.task('build', gulp.parallel('default', 'clean', 'prebuild', 'image'));
