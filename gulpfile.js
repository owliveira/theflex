var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require("gulp-rename");

var paths = {
	sassMain: ['src/sass/main.scss'],
	build: 'dist'
};

gulp.task('build-dist', function () {
	return gulp.src(paths.sassMain)
		.pipe(sass({
			errLogToConsole: true,
			outputStyle: 'compressed'
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
		.pipe(rename(function (path){
			path.basename = 'theflex'
		}))
		.pipe(gulp.dest(paths.build));
});

gulp.task('sass:watch', function () {
	gulp.watch('src/sass/*.scss', ['build-dist', 'build-dev'])
});

gulp.task('build', ['build-dist', 'build-dev']);

gulp.task('start', ['sass:watch']);