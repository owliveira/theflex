var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');

var paths = {
	sassMain: ['src/sass/main.scss'],
	build: ''
};

gulp.task('connect', function(){
	connect.server({
		livereload: true
	});
});

gulp.task('build-dist', function () {
	return gulp.src(paths.sassMain)
		.pipe(sass({
			errLogToConsole: true,
			outputStyle: 'compressed'
		}))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(rename(function (path){
			path.basename = 'theflex.min'
		}))
		.pipe(gulp.dest(paths.build));
});

gulp.task('build-dev', function () {
	return gulp.src(paths.sassMain)
		.pipe(sass({
			errLogToConsole: true,
			outputStyle: 'nested'
		}))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(rename(function (path){
			path.basename = 'theflex'
		}))
		.pipe(gulp.dest(paths.build));
});

gulp.task('sass:watch', function () {
	gulp.watch('src/sass/*.scss', ['build-dev']);
});

gulp.task('build', ['build-dist', 'build-dev']);

gulp.task('serve', ['connect', 'sass:watch']);