import { Request } from "express";

const { Router } = require("express");

export const router = Router();
const marketList = [
  { store: "Mikus Mikus", id: 2, miles: 4.3 },
  { store: "Anytime Fitness", id: 1, miles: 0.4 },
  { store: "Tarts", id: 3, miles: 8.3 },
];

router.get("/", (request, response) => {
  const { miles, sortBy }: { miles: number; sortBy: "ASC" | "DESC" } =
    request.query;

  const _filteredMarketList = marketList
    .filter((market) => (miles ? market.miles < miles : true))
    .sort((a, b) => {
      if (sortBy === "ASC") {
        return a.miles - b.miles;
      } else {
        return b.miles - a.miles;
      }
    });
  response.send({
    status: 200,
    data: _filteredMarketList,
  });
});

// GET http://localhost:3001/
router.get("/:id/", (req, res) => {
  const { id } = req.parmas;
  const itemObject = marketList.find((it) => it.id === id);
  res.send(itemObject);
});

router.post("/", (request: Request, response) => {
  marketList.push(request.body);
  response.send({ status: 201 });
});
