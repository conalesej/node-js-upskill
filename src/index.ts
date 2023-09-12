const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
import { groceriesRoute, marketsRoute } from "./routes";

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

// We can prefix this with "api" or anything you want
app.use("/groceries", groceriesRoute);
app.use("/markets", marketsRoute);

app.listen(PORT, () => {
  console.log(`Running Express server on port ${PORT}`);
});
