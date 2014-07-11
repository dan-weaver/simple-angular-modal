var gulp = require('gulp'),
    karma = require('gulp-karma'),
    connect = require('gulp-connect');

gulp.task('server', function(){
  connect.server({
    root: ['misc/demo']
  });
});

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

gulp.task('default', ['test']);