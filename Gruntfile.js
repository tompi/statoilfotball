module.exports = function(grunt) {
  require('grunt-load')(grunt).loadNpmTasks();
  grunt.loadNpmTasks('grunt-webpack');
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: require('./tasks/jshint'),
    nodeunit: require('./tasks/nodeunit'),
    less: require('./tasks/less'),
    copy: require('./tasks/copy'),
    clean: require('./tasks/clean'),
    useminPrepare: require('./tasks/useminPrepare'),
    usemin: require('./tasks/usemin'),
    watch: require('./tasks/watch'),
    webpack: require('./tasks/webpack')
  });
  grunt.registerTask('test', 'nodeunit');

  // Default task(s).
  grunt.registerTask('default', [
                     'clean',
                     'jshint',
                     'nodeunit',
                     'less',
                     'copy',
                     'useminPrepare',
                     'concat',
                     'uglify',
                     'webpack',
                     'cssmin',
                     'usemin']);
};
