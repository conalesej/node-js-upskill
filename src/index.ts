import express = require("express");

const app = express();

const PORT = 3001;

// Make sure this is declared first before using any middle ware
app.use(express.json());
app.use(express.urlencoded());

app.listen(PORT, () => {
  console.log(`Running Express server on port ${PORT}`);
});

const groceriesList = [
  { item: "milk", quantity: 3 },
  { item: "eggs", quantity: 6 },
  { item: "pop-tarts", quantity: 9 },
];

// this will trigger as well
app.use((req, res, next) => {
  console.log(`${req.method}: ${req.url}`);
  console.log("Middleware 1");
  // Perform some actions or checks here
  // If everything is okay, call next() to pass control to the next middleware
  next();
});

app.get(
  "/groceries",
  // Middleware function
  (request, response, next) => {
    console.log("Before Handling Request");
    next();
  },
  // Middleware function
  (request, response, next) => {
    console.log("Redirecting request");
    next();
  },
  (request, response, next) => {
    // this can be the end
    response.send({ status: 200, data: groceriesList });
    next();
  },
  (request, response, next) => {
    // this can be the end
    console.log("Ending request");
  }
);

app.post("/grocery", (request, response) => {
  groceriesList.push(request.body);
  response.send({ status: 201 });
});
