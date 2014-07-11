var gulp = require('gulp');
var karma = require('gulp-karma');

gulp.task('test', function() {
  // Be sure to return the stream
  return gulp.src('./foobar')
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});

gulp.task('default', function() {
  // place code for your default task here
});