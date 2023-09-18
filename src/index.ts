import { groceriesRoute, marketsRoute, authRoute } from "./routes";
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");

require("./database/index");
require("./strategies/local");
const app = express();
const PORT = 3001;

// Make sure this is declared first before using any middle ware
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(
  session({
    secret: "WEIORFHLWEKR23823230j9mlksd/,k.vxcnb;ke",
    resave: false,
    saveUninitialized: false,
  })
);
app.use("/auth", authRoute);

// Print routes
app.use((req, _, next) => {
  console.log(`Method: ${req.method}, Route: ${req.url}`);
  next();
});

// For protecting routes
app.use((req, res, next) => {
  if (req.session.user) next();
  else {
    res.send(401);
  }
});

app.use(passport.initialize());
app.use(passport.session());

// We can prefix this with "api" or anything you want
app.use("/groceries", groceriesRoute);
app.use("/markets", marketsRoute);

app.listen(PORT, () => {
  console.log(`Running Express server on port ${PORT}`);
});
