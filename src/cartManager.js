import fs from "fs";

class CartManager {
  constructor(path) {
    this.path = path;
    if (fs.existsSync(this.path)) {
      try {
        this.carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      } catch (error) {
        this.carts = [];
      }
    } else {
      this.carts = [];
    }
  }

  addCart() {
    const newCart = { id: this.carts.length + 1, products: [] };
    this.carts.push(newCart);
    fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2));
  }

  getCartById(id) {
    const cart = this.carts.find(c => c.id == id);
    return cart || null;
  }

  addProductToCart(cartId, productId) {
    const cart = this.getCartById(cartId);
    if (!cart) return;

    const product = cart.products.find(p => p.product == productId);
    if (product) {
      product.quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }
    fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2));
  }
}

export default new CartManager("./data/carts.json");
