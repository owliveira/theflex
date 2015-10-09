var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require("gulp-rename");

var paths = {
	sassMain: ['src/sass/main.scss'],
	build: 'dist'
};
var isDist = !!~process.argv.indexOf('--dist');

gulp.task('build', function () {
	return gulp.src(paths.sassMain)
		.pipe(sass({
			errLogToConsole: true,
			outputStyle: isDist ? 'compressed' : 'nested'
		}))
		.pipe(rename(function (path){
			path.basename = isDist ? 'theflex.min' : 'theflex';
		}))
		.pipe(gulp.dest(paths.build));
});

gulp.task('sass:watch', function () {
	gulp.watch('src/sass/*.scss', ['build'])
});

gulp.task('start', ['sass:watch']);