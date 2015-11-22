// Imports
var gulp = require('gulp');
var sass = require('gulp-sass');

// SASS options
var sassOptions = {
    errLogToConsole: true,
    outputSassStyle: 'expanded'
};

// Folders
var inputSass = 'css/sass/**/*.scss';
var outputSass = './css/';

gulp.task('styles', function() {
    // Find all `.scss` files from the inputSass folder
    gulp.src(inputSass)
    // Run Sass on those files and show errors
    .pipe(sass(sassOptions).on('error', sass.logError))
    // Write the resulting CSS in the outputSass folder
    .pipe(gulp.dest(outputSass));
});

// Controls changes on Sass folder
gulp.task('watch', function() {
    // Watch the inputSass folder for change and run `sass` task when something happens
    gulp.watch(inputSass, ['styles'])
    // When there is a change logs a message in the console
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

// Files to production
gulp.task('prod', function () {
    gulp.src(inputSass)
    .pipe(sass({ outputSassStyle: 'compressed' }))
    .pipe(gulp.dest(outputSass));
});

// Default action
gulp.task('default',function() {
    gulp.watch(inputSass,['styles', 'watch']);
});
