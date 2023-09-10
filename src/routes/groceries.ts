import { Request, Response } from "express";

const { Router } = require("express");

export const router = Router();
const groceriesList = [
  { item: "milk", quantity: 3 },
  { item: "eggs", quantity: 6 },
  { item: "pop-tarts", quantity: 9 },
];

router.get("/", (request: Request, response: Response) => {
  response.cookie("visited", true, {
    maxAge: 100000,
  });

  response.send({ status: 200, data: groceriesList });
});

// GET http://localhost:3001/
router.get("/:item/", (req: Request, res) => {
  // const cookies = req.headers.cookie; // without the cookie-parser
  const cookies = req.cookies; // without the cookie-parser

  console.log({ cookies });
  const { item } = req.params;
  const itemObject = groceriesList.find((it) => it.item === item);
  res.send(itemObject);
});

router.post("/", (request, response) => {
  groceriesList.push(request.body);
  response.send({ status: 201 });
});
