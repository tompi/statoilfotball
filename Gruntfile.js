module.exports = function(grunt) {
  require('grunt-load')(grunt).loadNpmTasks();

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['*.js', 'client/**/*.js', 'server/**/*.js', '!**/*.min.js']
    },
    less: {
      dev: {
        options: {
          paths: ["client/css"],
          cleancss: true
        },
        files: {
          "client/css/bootstrap.css": "client/css/bootstrap.less"
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          'client/css/all.min.css': [
            'client/css/bootstrap.css',
            'client/css/custom.css'
          ]
        }
      }
    },
    copy: {
      dev: {
        files: [
          {expand: true, cwd: 'bower_components/bootstrap/dist', src: ['fonts/*'], dest: 'client/'},
          {expand: true, cwd: 'bower_components/bootstrap/dist/js', src: ['*.min.js'], dest: 'client/js/lib/'},
          {expand: true, cwd: 'bower_components/angular/', src: ['angular.min.js', 'angular.min.js.map'], dest: 'client/js/lib/'},
          {expand: true, cwd: 'bower_components/angular-route/', src: ['angular-route.min.js', 'angular-route.min.js.map'], dest: 'client/js/lib/'},
          {expand: true, cwd: 'bower_components/jquery/', src: ['jquery.min.js', 'jquery.min.map'], dest: 'client/js/lib/'},
          {expand: true, src: ['*.json'], dest: 'client/home/'}
        ]
      },
      build: {
        files: [
          {expand: true, cwd: 'server/', src: ['**'], dest: 'build/server/'},
          {expand: true, cwd: 'client', src: ['**/*.min.*', '*.html', 'fonts/*', '*.json'], dest: 'build/client'}
        ]
      }
    },
    clean: ['build/', 'client/js/lib/'],
    watch: {
      options: {
        livereload: true
      },
      css: {
        files: ['client/**/*.css', '!**/*.min.css'],
        tasks: ['cssmin']
      },
      less: {
        files: ['client/**/*.less'],
        tasks: ['less']
      },
      html: {
        files: ['client/**/*.html'],
        tasks: []
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['clean', 'jshint', 'less', 'cssmin', 'copy']);
};
