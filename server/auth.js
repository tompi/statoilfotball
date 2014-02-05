exports.init = function(app, config, passport, userService) {

    function afterLogin(req, res) {
      res.redirect('/');
    }

    var users = [];

    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
        FacebookStrategy = require('passport-facebook').Strategy,
        LinkedInStrategy = require('passport-linkedin').Strategy;

    passport.serializeUser(function(user, done) {
        done(null, user.provider + "-" + user.id);
    });

    passport.deserializeUser(function(id, done) {
        var user = users[id];
        done(null, user);
    });

    function authenticatedUser(accessToken, refreshToken, profile, done) {
        var user = users[profile.provider + "-" + profile.id];
        if (!user) {
            userService.findOrCreateUser(profile, function(dbUser) {
                user = dbUser;
                users[profile.provider + "-" + profile.id] = user;
                return done(null, user);
            });
        } else {
            return done(null, user);
        }
    }

    var googleConfig = config.passport.google;
    if (googleConfig) {
      passport.use(new GoogleStrategy(googleConfig, authenticatedUser));
      app.get('/auth/google',
      passport.authenticate('google', {
        scope: [
          'https://www.googleapis.com/auth/userinfo.profile', 
          'https://www.googleapis.com/auth/userinfo.email'
        ]
      }));

      app.get('/oauth2callback', passport.authenticate('google', {
        failureRedirect: '/error'
      }), afterLogin);
    }

    var facebookConfig = config.passport.facebook;
    if (facebookConfig) {
      passport.use(new FacebookStrategy(facebookConfig, authenticatedUser));

      app.get('/auth/facebook',
      passport.authenticate('facebook', {
        scope: ['email']
      }));

      app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/error'
      }), afterLogin);
    }

    var linkedinConfig = config.passport.facebook;
    if (linkedinConfig) {
      passport.use(new LinkedInStrategy(linkedinConfig, authenticatedUser));

      app.get('/auth/linkedin', passport.authenticate('linkedin'));

      app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
        failureRedirect: '/error'
      }), afterLogin);
    }

    // For debug purposes: get your own account info as json
    app.get('/account-json', ensureAuthenticated, function(req, res) {
        res.json(req.user);
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/#passport');
    }
};
