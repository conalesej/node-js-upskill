const { Router } = require("express");

export const router = Router();
const groceriesList = [
  { item: "milk", quantity: 3 },
  { item: "eggs", quantity: 6 },
  { item: "pop-tarts", quantity: 9 },
];

router.get(
  "/",
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
    request.params;
    response.send({ status: 200, data: groceriesList });
    next();
  },
  (request, response, next) => {
    // this can be the end
    console.log("Ending request");
  }
);

// GET http://localhost:3001/
router.get("/:item/", (req, res) => {
  const { item } = req.params;
  const itemObject = groceriesList.find((it) => it.item === item);
  res.send(itemObject);
});

router.post("/", (request, response) => {
  groceriesList.push(request.body);
  response.send({ status: 201 });
});
