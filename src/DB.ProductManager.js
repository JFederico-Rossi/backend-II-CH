import { productModel } from "../models/products.model.js";

// Obtener todos los productos con paginación
export const getAllProducts = async (req, res) => {
  const { limit = 10, page = 1 } = req.query;

  try {
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    const result = await productModel.paginate({}, options);

    const response = {
      status: 'success',
      payload: result.docs,
      pagination: {
        totalPages: result.totalPages,
        prevPage: result.hasPrevPage ? result.page - 1 : null,
        nextPage: result.hasNextPage ? result.page + 1 : null,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage ? `/api/products?limit=${limit}&page=${result.page - 1}` : null,
        nextLink: result.hasNextPage ? `/api/products?limit=${limit}&page=${result.page + 1}` : null,
      }
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Obtener un producto por su ID
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productModel.findById(id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Agregar un nuevo producto
export const createProduct = async (req, res) => {
  const { title, description, code, price, stock, category, thumbnails } = req.body;
  try {
    const newProduct = new productModel({ title, description, code, price, stock, category, thumbnails });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar un producto existente
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, code, price, stock, category, thumbnails } = req.body;
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { title, description, code, price, stock, category, thumbnails },
      { new: true }
    );
    if (!updatedProduct) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un producto
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await productModel.findByIdAndDelete(id);
    if (!deletedProduct) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};