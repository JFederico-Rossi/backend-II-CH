import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/products.model.js";

// Crear un nuevo carrito
export const createCart = async (req, res) => {
  try {
    const newCart = new cartModel({ products: [] });
    await newCart.save();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un carrito por su ID y hacer populate de productos
export const getCartById = async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartModel.findById(cid).populate('products');
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Agregar un producto al carrito
export const addProductToCart = async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const cart = await cartModel.findById(cid);
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

    const product = await productModel.findById(pid);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    cart.products.push(product);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Eliminar un producto del carrito
export const deleteProductFromCart = async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const cart = await cartModel.findById(cid);
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

    cart.products = cart.products.filter(productId => productId.toString() !== pid);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar todos los productos del carrito
export const updateCartProducts = async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;
  try {
    const cart = await cartModel.findById(cid);
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

    cart.products = products;
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar la cantidad de un producto en el carrito
export const updateProductQuantity = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    const cart = await cartModel.findById(cid);
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

    const productIndex = cart.products.findIndex(productId => productId.toString() === pid);
    if (productIndex === -1) return res.status(404).json({ message: 'Producto no encontrado en el carrito' });

    cart.products[productIndex].quantity = quantity;
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar todos los productos del carrito
export const deleteAllProductsFromCart = async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartModel.findById(cid);
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

    cart.products = [];
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}