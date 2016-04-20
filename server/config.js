var url = require('url');

module.exports = {
  mongodb: {
    host: 'ds033734.mongolab.com:33734',
    db: 'webstepfotball',
    user: 'webstep',
    password: 'topsecret'
  },
  sessionSecret: 'webstepsecret',
  passport: {
    google: {
      clientID: '1098607882040.apps.googleusercontent.com',
      clientSecret: 'CISVtnCf9N5L7IZPBVddeK48',
      callbackURL: 'http://localhost:3000/oauth2callback',
      handler: '/oauth2callback'
    },
    /* Prod:
    google: {
      clientID: '198166778757.apps.googleusercontent.com',
      clientSecret: 'f_d8LFCyqg1tyqFQ41xbOTTc',
      emailAddress: '198166778757@developer.gserviceaccount.com',
      callbackURL: 'http://fotball.us/oauth2callback',
      handler: '/oauth2callback'
    },
    */
    /* Debug:
    */
    facebook: {
      clientID: '396026930541318',
      clientSecret: 'c8c711ef1c55b53b5ac926893c954d85',
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      profileFields: ['id', 'name', 'emails', 'displayName', 'photos']
    }
    /* Prod:
    facebook: {
      clientID: '403518086450774',
      clientSecret: '7b5399bdb5fff8970deb062bd150823b',
      callbackURL: 'http://fotball.us/auth/facebook/callback',
      profileFields: ['id', 'name', 'emails', 'displayName', 'photos']
    }
    */
  }
};
