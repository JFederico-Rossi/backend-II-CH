import { Router } from 'express';
import ProductManager from '../productManager.js';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../DB.ProductManager.js';

const productsRouter = Router();

productsRouter.get("/", getAllProducts);
productsRouter.get("/:id", getProductById);
productsRouter.post("/", createProduct);
productsRouter.put("/:id", updateProduct);
productsRouter.delete("/:id", deleteProduct);

/* productsRouter.get('/', (req, res) => {
  res.json(ProductManager.getProducts());
});

productsRouter.get('/:pid', (req, res) => {
  const { pid } = req.params;
  const product = ProductManager.getProductById(pid);

  if (!product) {
    return res.status(404).json({ error: "No se encontró el producto" });
  }
  res.json(product);
});

productsRouter.post('/', (req, res) => {
  const newProduct = req.body;
  ProductManager.addProduct(newProduct);
  res.status(201).json({ message: "Producto agregado correctamente" });
});

productsRouter.put('/:pid', (req, res) => {
  const { pid } = req.params;
  const updatedProduct = req.body;
  ProductManager.updateProduct(pid, updatedProduct);
  res.json({ message: "Producto actualizado correctamente" });
});

productsRouter.delete('/:pid', (req, res) => {
  const { pid } = req.params;
  ProductManager.deleteProduct(pid);
  res.json({ message: "Producto eliminado correctamente" });
}); */

export default productsRouter;
