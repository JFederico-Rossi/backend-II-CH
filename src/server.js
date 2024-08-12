import express from "express";
import ProductManager from "./productManager.js";
import CartManager from "./cartManager.js";
import productsRouter from "./routes/productsRouter.js";
import cartsRouter from "./routes/cartsRouter.js";
import handlebars from "express-handlebars";
import path from "path";
import fs from "fs";
import __dirname from "./dirname.js";
import viewsRoutes from "./routes/viewsRoutes.js";
import { Server } from "socket.io";
import mongoose from "mongoose";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import cookieParser from "cookie-parser";
import { initializePassport } from "../src/config/passport.config.js";
import authController from "../src/controllers/authController.js";
import passport from "passport";
import authRouter from './routes/authRouter.js';

// MongoDB via Mongoose
const url = "mongodb://localhost:27017/entrega-final";

async function main() {
  await mongoose
    .connect(url)
    .then(() => {
      console.log("DB Connected");
    })
    .catch((error) => {
      console.log("Error al conectarse a la DB", error);
    });

  let products = JSON.parse(fs.readFileSync("./data/products.json", "utf-8"));

  const app = express();
  const PORT = 8000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.resolve(__dirname, "../public")));
  app.use(cookieParser());

  initializePassport();
  app.use(passport.initialize());

  //Handlebars
  app.engine(
    "hbs",
    handlebars.engine({
      extname: "hbs",
      defaultLayout: "main",
      layoutsDir: path.join(__dirname, "views/layouts"),
    })
  ),
    app.set("view engine", "hbs");
  app.set("views", `${__dirname}/views`);

  const httpServer = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  //Instancia del websocket del servidor
  /* const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);
  
  socket.on("disconnect", () => {
    console.log(`Cliente desconectado: ${socket.id}`)
  })
  
  socket.emit("getProducts", products)


socket.on("addProduct", (newProduct) => {
  const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
  newProduct.id = id;
  products.push(newProduct);
  fs.writeFileSync("./data/products.json", JSON.stringify(products, null, 2));
  io.emit("getProducts", products); // Emitir actualización de productos
});

socket.on("deleteProduct", (id) => {
  products = products.filter(product => product.id !== id);
  fs.writeFileSync("./data/products.json", JSON.stringify(products, null, 2));
  io.emit("getProducts", products); // Emitir actualización de productos
});
}) */

  // Rutas para productos y carrito

  app.use("/api/products", productsRouter);
  app.use("/api/carts", cartsRouter);
  app.use("/", viewsRoutes);
  app.use("/api/auth", authRouter)
}
main();
