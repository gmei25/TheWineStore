const productosEnCarrito = localStorage.getItem("productosDelCarrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const carritoVacio = document.querySelector("#carritoVacio");
const carritoProductos = document.querySelectorAll("#carritoProductos");
const carritoAcciones = document.querySelector("#carritoAcciones");
const carritoComprado = document.querySelector("#carritoComprado");
const botonEliminar = document.querySelectorAll(".eliminarProducto")


function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0){
productosEnCarrito = JSON.parse(productosEnCarrito)

        carritoVacio.classList.add("disabled");
        carritoProductos.classList.remove("disabled");
        carritoAcciones.classList.remove("disabled");
        carritoComprado.classList.add("disabled");
    
    contenedorProductos.innerHTML = "";
    
        productosEnCarrito.forEach((producto) => {
            const div = document.createElement("div");
            div.classList.add("carritoProducto");
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
    
    })
    
    }else{
        carritoVacio.classList.remove("disabled");
        carritoProductos.classList.add("disabled");
        carritoAcciones.classList.add("disabled");
        carritoComprado.classList.add("disabled");
    }
    actualizarBotonesEliminar();
}
cargarProductosCarrito();



function actualizarBotonesEliminar(){
    botonEliminar = document.querySelectorAll(".botonEliminar");

    botonEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    })
   
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoEliminado = productosEnCarrito.find(producto => producto.id === idBoton);
    productosEnCarrito.splice(index, 1);

    localStorage.setItem()
}
