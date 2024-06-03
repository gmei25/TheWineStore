let productos = [];
fetch("../js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        agregarProductos(productos)
    })

//LLamados al DOM
const contenedorProductos = document.querySelector("#contenedorProductos");
const categorias = document.querySelectorAll(".btnCategoria");
const tituloPpal = document.querySelector("#tituloPpal");
let agregarBtn = document.querySelectorAll(".btnAgregar");
const numerito = document.querySelector("#numerito");



function agregarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach((producto) => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="productoImg" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="productoDetalles">
            <h3 class="productoNombre">${producto.titulo}</h3>
            <p class="productoPrecio">$${producto.precio}</p>
            <button class="btnAgregar" id="${producto.id}">Agregar</button>
        `;

        contenedorProductos.append(div);
    });
    actualizarBotonesAgregar();
}
agregarProductos(productos);

categorias.forEach((boton) => {
    boton.addEventListener("click", (e) => {

        categorias.forEach((boton => boton.classList.remove("active")));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productosCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPpal.innerText = productosCategoria.categoria.nombre;

           
            const productosBtn = productos.filter((producto) => producto.categoria.id === e.currentTarget.id);
            agregarProductos(productosBtn);
        } else {
            tituloPpal.innerText = "Todos los productos";
            agregarProductos(productos);
        }
    });
});


function actualizarBotonesAgregar() {
    agregarBtn = document.querySelectorAll(".btnAgregar");

    agregarBtn.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}


const productosEnCarritoLS = localStorage.getItem("productosDelCarrito");

const productosEnCarrito = [];


if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBotones = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBotones);

    if (productosEnCarrito.some(producto => producto.id === idBotones)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBotones);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito();

    localStorage.setItem("productosDelCarrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
