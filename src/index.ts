const express = require("express");
const cookieParser = require("cookie-parser");
import { groceriesRoute, marketsRoute } from "./routes";

const app = express();

const PORT = 3001;

// Make sure this is declared first before using any middle ware
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

// We can prefix this with "api" or anything you want
app.use("/groceries", groceriesRoute);
app.use("/markets", marketsRoute);

app.listen(PORT, () => {
  console.log(`Running Express server on port ${PORT}`);
});
