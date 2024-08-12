import { Router } from 'express';
// import CartManager from '../cartManager.js'; 
import { createCart, getCartById, addProductToCart, deleteProductFromCart, updateCartProducts, updateProductQuantity, deleteAllProductsFromCart } from '../DB.CartManager.js';

const cartsRouter = Router();

cartsRouter.post("/", createCart);
cartsRouter.get("/:cid", getCartById);
cartsRouter.post("/:cid/product/:pid", addProductToCart);
cartsRouter.delete("/:cid/products/:pid", deleteProductFromCart);
cartsRouter.put("/:cid", updateCartProducts);
cartsRouter.put("/:cid/products/:pid", updateProductQuantity);
cartsRouter.delete("/:cid", deleteAllProductsFromCart);


export default cartsRouter;
