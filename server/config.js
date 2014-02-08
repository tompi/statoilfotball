module.exports = {
  mongodb: {
    host: 'widmore.mongohq.com:10010',
    db: 'jobbfotball',
    user: 'statoil',
    password: 'procosys'
  },
  sessionSecret: 'statoilfotball',
  passport: {
    google: {
      clientID: '198166778757.apps.googleusercontent.com',
      clientSecret: 'f_d8LFCyqg1tyqFQ41xbOTTc',
      emailAddress: '198166778757@developer.gserviceaccount.com',
      callbackURL: 'http://statoilfotball.herokuapp.com/oauth2callback'
    },
    facebook: {
      clientID: '403518086450774',
      clientSecret: '7b5399bdb5fff8970deb062bd150823b',
      callbackURL: 'http://statoilfotball.herokuapp.com/auth/facebook/callback'
    }
  }
};
