let productosAgregadosAlCarrito = localStorage.getItem("productosEnElCarrito");
productosAgregadosAlCarrito = JSON.parse(productosAgregadosAlCarrito);

const carritoProductos = document.querySelector("#carritoProductos")
const carritoVacio = document.querySelector("#carritoVacio");
const carritoAcciones = document.querySelector("#carritoAcciones");
const comprarCarrito = document.querySelector("#comprarCarrito");
let botonTrash = document.querySelectorAll(".eliminarProducto");
const total = document.querySelector("#total");
const botonComprar = document.querySelector("#comprar");

function mostrarProductosEnCarrito(){
    if (productosAgregadosAlCarrito && productosAgregadosAlCarrito.length > 0) {

    carritoVacio.classList.add("disabled");
    carritoProductos.classList.remove("disabled");
    carritoAcciones.classList.remove("disabled");
    comprarCarrito.classList.add("disabled");
    
    carritoProductos.innerHTML="";
    
    productosAgregadosAlCarrito.forEach(producto => {
        
        const div = document.createElement("div");
        div.classList.add("carritoConProductos");
        div.innerHTML = `
        <img class="carritoImg" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="carritoProductoNombre">
            <small>Producto</small>
            <h3>${producto.titulo}</h3>
        </div>
        <div class="carritoProductoCantidad">
            <small>Cantidad</small>
            <p>${producto.cantidad}</p>
        </div>
        <div class="carritoProductoPrecio">
            <small>Precio</small>
            <p>$${producto.precio}</p>
        </div>
        <div class="carritoProductosSubtotal">
            <small>Subtotal</small>
            <p>$${producto.precio * producto.cantidad}</p>
        </div>
        <button class="eliminarProducto" id="${producto.id}"><i class='bx bxs-trash'></i></button>
        `;
        carritoProductos.append(div);
    
        
    });
} else {
        carritoVacio.classList.remove("disabled");
        carritoProductos.classList.add("disabled");
        carritoAcciones.classList.add("disabled");
        carritoComprado.classList.add("disabled");

        botonesEliminar();
        actualizarTotal();
    }}
mostrarProductosEnCarrito();


function botonesEliminar() {
    botonTrash = document.querySelectorAll(".eliminarProducto");

    botonTrash.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    const botonId = e.currentTarget.id;
    const index = productosAgregadosAlCarrito.findIndex(producto => producto.id === botonId);
    productosAgregadosAlCarrito.splice(index, 1);
    mostrarProductosEnCarrito();

    localStorage.setItem("productosEnElCarrito", JSON.stringify(productosAgregadosAlCarrito));
}

function actualizarTotal() {
    const totalCalc = productosAgregadosAlCarrito.reduce ((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalc}`;
}

botonComprar.addEventListener("click", comprar);

function comprar() {
    productosAgregadosAlCarrito.length = 0;
    localStorage.setItem("productosEnElCarrito", JSON.stringify(productosAgregadosAlCarrito));

        carritoVacio.classList.add("disabled");
        carritoProductos.classList.add("disabled");
        carritoAcciones.classList.add("disabled");
        carritoComprado.classList.remove("disabled");

}
