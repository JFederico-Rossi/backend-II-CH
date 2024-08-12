import fs from "fs";

class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.id = 0;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

class ProductManager {
  constructor(path) {
    this.path = path;
    if (fs.existsSync(this.path)) {
      try {
        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      } catch (error) {
        this.products = [];
      }
    } else {
      this.products = [];
    }
  }

  async addProduct(product) {

    if (this.products.some(p => p.code === product.code)) {
      console.log("Producto con este código ya existe");
      return;
    }
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      console.log("Todos los campos son obligatorios");
      return;
    }

    if (this.products.length > 0) {
      const newId = this.products[this.products.length - 1].id + 1;
      product.id = newId;
    } else {
      product.id = 1;
    }

    this.products.push(product);

    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, 2)
      );
      console.log("Se agregó el producto correctamente");
    } catch (error) {
      console.log(error);
    }
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id == id);
    return product || null;
  }

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex((p) => p.id == id);
    if (index === -1) return;

    this.products[index] = { ...this.products[index], ...updatedProduct };
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
  }

  deleteProduct(id) {
    this.products = this.products.filter((p) => p.id != id);
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
  }
}

//Pruebas
const manager = new ProductManager("./data/products.json");

//Add Product
//manager.addProduct(new Product("Prueba", "Description de prueba", 12, "image.com", "CC10Ad", 9);

//console.log(manager.getProductById(2))
//console.log(manager.getProducts())
//manager.deleteProduct(14)

export default new ProductManager("./data/products.json");
