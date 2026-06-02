const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { getGoogleAuthConfig } = require('./google-auth');
const membersService = require('../modules/members/members.service');

const googleAuthConfig = getGoogleAuthConfig();

if (googleAuthConfig.clientID && googleAuthConfig.clientSecret) {
  passport.use(new GoogleStrategy(
    {
      clientID: googleAuthConfig.clientID,
      clientSecret: googleAuthConfig.clientSecret,
      callbackURL: googleAuthConfig.callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const result = await membersService.loginWithGoogle(profile);
        return done(null, result);
      } catch (error) {
        return done(error);
      }
    },
  ));
}

module.exports = passport;
