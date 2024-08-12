import { Router } from "express";
import fs from "fs";

const router = Router();
let products = JSON.parse(fs.readFileSync("./data/products.json", "utf-8"));

router.get("/", (req, res) => {
  res.render("index", { products });
});

router.get("/products", (req, res) => {
  res.render("products", { products });
});

router.get("/realTimeProducts", (req, res) => {
  res.render("realTimeProducts", { products });
});

export default router;
