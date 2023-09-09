import express = require("express");
import { router as groceriesRoute } from "./routes/groceries";
const app = express();

const PORT = 3001;

// Make sure this is declared first before using any middle ware
app.use(express.json());
app.use(express.urlencoded());

// We can prefix this with "api" or anything you want
app.use("/groceries", groceriesRoute);

app.listen(PORT, () => {
  console.log(`Running Express server on port ${PORT}`);
});
