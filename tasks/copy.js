module.exports = {
  dev: {
    files: [
      {expand: true, cwd: 'bower_components/bootstrap/dist', src: ['fonts/*'], dest: 'client/assets/'},
      {expand: true, cwd: 'bower_components/bootstrap/dist/js', src: ['bootstrap.js'], dest: 'client/js/lib/'},
      {expand: true, cwd: 'bower_components/angular/', src: ['angular.js'], dest: 'client/js/lib/'},
      {expand: true, cwd: 'bower_components/angular-route/', src: ['angular-route.js'], dest: 'client/js/lib/'},
      {expand: true, cwd: 'bower_components/bootstrap-datepicker/js/', src: ['bootstrap-datepicker.js'], dest: 'client/js/lib/'},
      {expand: true, cwd: 'bower_components/bootstrap-datepicker/css/', src: ['datepicker3.css'], dest: 'client/css/'},
      {expand: true, cwd: 'bower_components/angular-strap/dist/', src: ['angular-strap.js'], dest: 'client/js/lib/'},
      {expand: true, cwd: 'bower_components/jquery/', src: ['jquery.js'], dest: 'client/js/lib/'},
      {expand: true, cwd: 'bower_components/lodash/dist/', src: ['lodash.js'], dest: 'client/js/lib/'},
      {expand: true, cwd: 'bower_components/restangular/dist/', src: ['restangular.js'], dest: 'client/js/lib/'},
      {expand: true, src: ['*.json'], dest: 'client/assets/'}
    ]
  },
  build: {
    files: [
      {expand: true, cwd: 'server/', src: ['**'], dest: 'build/server/'},
      {expand: true, cwd: 'client', src: ['**/*', '!css/**/*', '!js/**/*'], dest: 'build/client', filter: 'isFile'}
    ]
  }
};
