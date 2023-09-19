import { groceriesRoute, marketsRoute, authRoute } from "./routes";
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoStore = require("connect-mongo");
const session = require("express-session");
const passport = require("passport");

require("./strategies/local");
require("./database/index");

const app = express();
const PORT = 3001;
const memoryStore = new session.MemoryStore();

// Make sure this is declared first before using any middle ware
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(
  session({
    secret: "WEIORFHLWEKR23823230j9mlksd/,k.vxcnb;ke",
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/expressjs_tutorial",
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoute);

// Print routes
app.use((req, _, next) => {
  console.log(`Method: ${req.method}, Route: ${req.url}`);
  next();
});

// For protecting routes
app.use((req, res, next) => {
  // if (req.session.user) next();
  console.log("Inside Grocereis Auth Check Middleware", req.user);
  if (req.user) next();
  else {
    res.send(401);
  }
});

// We can prefix this with "api" or anything you want
app.use("/groceries", groceriesRoute);
app.use("/markets", marketsRoute);

app.listen(PORT, () => {
  console.log(`Running Express server on port ${PORT}`);
});
