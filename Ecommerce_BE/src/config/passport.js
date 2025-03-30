import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import { UserModel } from "~/models/UserModel";

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.PersonID);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.getInfo(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0]?.value;

      try {
        const existingUser = await UserModel.getUserByEmail(email);
        if (existingUser) {
          return done(null, existingUser);
        } else {
          return done(null, false, { message: "Invalid account." });
        }
      } catch (err) {
        return done(err, null);
      }
    }
  )
);



export default passport
