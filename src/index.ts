import express = require("express");

const app = express();

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Running Express server on port ${PORT}`);
});
console.log("Hello World");
