//socket de cliente

const socket = io();

socket.on("getProducts", (data) => {
  const products = document.getElementById("list-products");
  if (!products) {
    console.error('El elemento con id "list-products" todavía no fue creado');
    return;
  }
  products.innerHTML = "";

  data.forEach((product) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <h4> ${product.title} </h4>
        <p> $ ${product.price}</p>
        <p> ${product.description}</p>
        <button onclick="deleteProduct(${product.id})" class="delete">Delete product</button>
        `;
    products.appendChild(div);
  });
});

//Enviar formulario de nuevo producto
const addProductForm = document.getElementById("add-product");
addProductForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newProduct = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,
    code: document.getElementById("code").value,
    stock: document.getElementById("stock").value,
  };

  socket.emit("addProduct", newProduct)
  addProductForm.reset()
});

//Botón de eliminar producto
function deleteProduct(id){
    const socket = io()
    socket.emit("deleteProduct", id)
}
