const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');

const {
  users: { User },
} = require('../models');
const { GOOGLE_CLIENT_ID, GOOGLE_SECRET_KEY } = process.env;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_SECRET_KEY,
      callbackURL:
        'https://wallet-server.onrender.com/api/users/google/callback', // MUST BE CHANGED!!!
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { email, displayName } = profile;
        let user = await User.findOne({ email });

        if (!user) {
          const hashPassword = await bcrypt.hash(nanoid(), 10);

          user = await User.create({
            email,
            username: displayName,
            password: hashPassword,
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  try {
    const user = await User.findOne({ email });
    done(null, user);
  } catch (error) {
    done(error);
  }
});

const passportConfig = {
  initialize: () => passport.initialize(),
  session: () => passport.session(),
};

module.exports = passportConfig;