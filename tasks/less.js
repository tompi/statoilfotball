module.exports = {
  dev: {
    options: {
      paths: ["client/css"],
      cleancss: true
    },
    files: {
      "client/css/bootstrap.css": "client/css/bootstrap.less"
    }
  }
};
