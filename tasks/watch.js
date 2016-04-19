module.exports = {
  options: {
    livereload: true
  },
  css: {
    files: ['client/**/*.css', '!**/*.min.css'],
    tasks: []
  },
  js: {
    files: ['client/**/*.js', '!**/*.min.js'],
    tasks: []
  },
  less: {
    files: ['client/**/*.less'],
    tasks: ['less']
  },
  html: {
    files: ['client/**/*.html'],
    tasks: []
  },
  react: {
    files: ['client-react/**'],
    tasks: ['webpack']
  }
};
