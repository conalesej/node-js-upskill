const passport = require("passport");
// const { Strategy } = require("passport-local");

import { Strategy } from "passport-local";
import UserModel from "../database/schemas/User";
import { comparePassword } from "../utils/helper";

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
          done(null, null);
        }
      } catch (e) {
        done(e, null);
      }
    }
  )
);
