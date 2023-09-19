const passport = require("passport");
// const { Strategy } = require("passport-local");

import { Strategy } from "passport-local";
import UserModel from "../database/schemas/User";
import { comparePassword } from "../utils/helper";

passport.serializeUser((user, done) => {
  // console.log("Serializing User", user);

  done(null, user.id);
});

// Taking the id from the session then search the database
passport.deserializeUser(async (id, done) => {
  console.log("Deserializing User", { id });
  try {
    const user = await UserModel.findById(id);
    console.log({ user });
    if (!user) throw new Error("User not found");
    done(null, user);
  } catch (e) {
    console.log(e);
    done(e, null);
  }
});

passport.use(
  new Strategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      //   console.log("local", { email, password });

      if (!email || !password) {
        throw new Error("Bad Request. Missing Credentials");
        // done(new Error("Bad Request. Missing Credentials"), null);
      }

      try {
        const userDB = await UserModel.findOne({ email });
        console.log({ userDB });
        if (!userDB) throw new Error("User not found");

        const isValid = comparePassword(password, userDB.password);
        if (isValid) {
          console.log("Authenticated Successfully");
          done(null, userDB);
        } else {
          console.log("Invalid Authentication");
          done(null, null);
        }
      } catch (e) {
        console.log({ e });
        done(e, null);
      }
    }
  )
);
