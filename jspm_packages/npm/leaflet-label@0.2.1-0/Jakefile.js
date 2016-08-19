/* */ 
var build = require('./build/build');
desc('Check Leaflet.label source for errors with JSHint');
task('lint', build.lint);
desc('Combine and compress Leaflet.label source files');
task('build', ['lint'], build.build);
task('default', ['build']);
