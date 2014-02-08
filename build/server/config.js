module.exports = {
  mongodb: {
    host: 'linus.mongohq.com:10010',
    db: 'webapp',
    user: 'webapuser',
    password: 'topsecret'
  },
  sessionSecret: 'verytopsecret',
  passport: {
    google: {
      clientID: '1098607882040.apps.googleusercontent.com',
      clientSecret: 'CISVtnCf9N5L7IZPBVddeK48',
      emailAddress: '1098607882040@developer.gserviceaccount.com',
      callbackURL: 'http://localhost:3000/oauth2callback'
    }
  }
};
