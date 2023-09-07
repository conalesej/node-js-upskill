import express = require("express");

const app = express();

const PORT = 3001;

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

app.get("/groceries", (request, response) => {
  response.send({ status: 200, data: groceriesList });
});
 
app.post("/grocery", (request, response) => {
  console.log(request.body);
  groceriesList.push(request.body);
  response.send({ status: 201 });
});
