var
  gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  cssnext = require('gulp-cssnext'),
  cssnano = require('gulp-cssnano'),
  replace = require('gulp-replace'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify')
;

gulp.task('css-main', function () {
  return gulp.src('css/main.css')
    .pipe(cssnext())
    .pipe(autoprefixer({ cascade: false, browsers: 'last 2 versions' }))
    .pipe(gulp.dest('tmp'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./'))
  ;
});

gulp.task('css-home', function () {
  return gulp.src('css/main-home.css')
    .pipe(cssnext())
    .pipe(autoprefixer({ cascade: false, browsers: 'last 2 versions' }))
    .pipe(replace(/svg\>/g, 'svg%3E'))
    .pipe(replace(/\<svg/g, '%3Csvg'))
    .pipe(replace(/\>\</g, '%3E%3C'))
    .pipe(replace(/='#/g, "='%23"))
    .pipe(gulp.dest('tmp'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./'))
  ;
});

gulp.task('css-topics', function () {
  return gulp.src('css/main-topics.css')
    .pipe(cssnext())
    .pipe(autoprefixer({ cascade: false, browsers: 'last 2 versions' }))
    .pipe(replace(/svg\>/g, 'svg%3E'))
    .pipe(replace(/\<svg/g, '%3Csvg'))
    .pipe(replace(/\>\</g, '%3E%3C'))
    .pipe(replace(/='#/g, "='%23"))
    .pipe(gulp.dest('tmp'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./'))
  ;
});

gulp.task('css-article', function () {
  return gulp.src('css/main-article.css')
    .pipe(cssnext())
    .pipe(autoprefixer({ cascade: false, browsers: 'last 2 versions' }))
    .pipe(replace(/svg\>/g, 'svg%3E'))
    .pipe(replace(/\<svg/g, '%3Csvg'))
    .pipe(replace(/\>\</g, '%3E%3C'))
    .pipe(replace(/='#/g, "='%23"))
    .pipe(gulp.dest('tmp'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./'))
  ;
});

gulp.task('js-common', function () {
  return gulp.src(['js/common.js'])
    .pipe(concat('common.min.js'))
    .pipe(gulp.dest('./'))
  ;
});

gulp.task('js-topics', function () {
  return gulp.src(['js/fuzzy-match.js', 'js/topic-search.js', 'js/topics-visited.js'])
    .pipe(concat('topics.min.js'))
    .pipe(gulp.dest('./'))
  ;
});

gulp.task('js-article', function () {
  return gulp.src(['js/prism.js', 'js/syntax.js', 'js/article-nav.js', 'js/section-links.js', 'js/video.js'])
    .pipe(concat('article.min.js'))
    .pipe(gulp.dest('./'))
  ;
});

gulp.task('build-css', ['css-main', 'css-home', 'css-topics', 'css-article'], function () {
  return gulp.src(['main.min.css', 'main-home.min.css', 'main-topics.min.css', 'main-article.min.css'])
    .pipe(cssnano())
    .pipe(gulp.dest('./'))
  ;
});

gulp.task('build-js', ['js-common', 'js-topics', 'js-article'], function () {
  return gulp.src(['common.min.js', 'topics.min.js', 'article.min.js'])
    .pipe(uglify())
    .pipe(gulp.dest('./'))
});

gulp.task('build', ['build-css', 'build-js']);

gulp.task('watch', function() {
  gulp.watch('css/*.css', ['css-main', 'css-home', 'css-topics', 'css-article']);
  gulp.watch('js/*.js', ['js-common', 'js-topics', 'js-article']);
});

gulp.task('default', ['css-main', 'css-home', 'css-topics', 'css-article', 'js-common', 'js-topics', 'js-article']);
