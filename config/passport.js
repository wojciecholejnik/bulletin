const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.use(new GoogleStrategy({
  clientID: '495395522908-oeji5vdo4usb4a1q97r3nq43c2hn99cr.apps.googleusercontent.com',
  clientSecret: 'UbORHs2mRvS-kIP9gM0mVv7g',
  callbackURL: 'http://localhost:9000/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
done(null, profile);
}));

// serialize user when saving to session
passport.serializeUser((user, serialize) => {
  serialize(null, user);
  });
  
// deserialize user when reading from session
  passport.deserializeUser((obj, deserialize) => {
  deserialize(null, obj);
  });