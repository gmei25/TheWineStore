document.addEventListener("DOMContentLoaded", () => {
    let productosAgregadosAlCarrito = localStorage.getItem("productosEnCarrito");
    productosAgregadosAlCarrito = JSON.parse(productosAgregadosAlCarrito) || [];

    const carritoProductos = document.querySelector("#carritoProductos");
    const carritoVacio = document.querySelector("#carritoVacio");
    const carritoAcciones = document.querySelector("#carritoAcciones");
    const comprarCarrito = document.querySelector("#comprarCarrito");
    const total = document.querySelector("#total");
    const botonComprar = document.querySelector("#comprar");

    function mostrarProductosEnCarrito() {
        if (productosAgregadosAlCarrito.length > 0) {
            carritoVacio.classList.add("disabled");
            carritoProductos.classList.remove("disabled");
            carritoAcciones.classList.remove("disabled");
            comprarCarrito.classList.add("disabled");

            carritoProductos.innerHTML = "";

            productosAgregadosAlCarrito.forEach(producto => {
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
                        <p>$${(producto.precio * producto.cantidad).toFixed(2)}</p>
                    </div>
                    <button class="eliminarProducto" id="${producto.id}"><i class='bx bxs-trash'></i></button>
                `;
                carritoProductos.appendChild(div);
            });

            botonesEliminar();
            actualizarTotal();
        } else {
            carritoVacio.classList.remove("disabled");
            carritoProductos.classList.add("disabled");
            carritoAcciones.classList.add("disabled");
            comprarCarrito.classList.remove("disabled");
        }
    }

    function botonesEliminar() {
        const botonTrash = document.querySelectorAll(".eliminarProducto");

        botonTrash.forEach(boton => {
            boton.addEventListener("click", eliminarDelCarrito);
        });
    }

    function eliminarDelCarrito(e) {
        const botonId = e.currentTarget.id;
        const index = productosAgregadosAlCarrito.findIndex(producto => producto.id === botonId);

        if (index !== -1) {
            productosAgregadosAlCarrito.splice(index, 1);
            localStorage.setItem("productosEnCarrito", JSON.stringify(productosAgregadosAlCarrito));
            mostrarProductosEnCarrito();
        }
    }

    function actualizarTotal() {
        const totalCalc = productosAgregadosAlCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
        total.innerText = `$${totalCalc.toFixed(2)}`;
    }

    botonComprar.addEventListener("click", comprar);

    function comprar() {
        productosAgregadosAlCarrito.length = 0;
        localStorage.setItem("productosEnCarrito", JSON.stringify(productosAgregadosAlCarrito));

        carritoVacio.classList.add("disabled");
        carritoProductos.classList.add("disabled");
        carritoAcciones.classList.add("disabled");
        comprarCarrito.classList.remove("disabled");
    }

    // Mostrar los productos en el carrito al cargar la página
    mostrarProductosEnCarrito();
});
