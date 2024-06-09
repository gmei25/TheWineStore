Swal.fire({
    title: "Sos mayor de 18?",
    showDenyButton: true,
    //showCancelButton: true,
    confirmButtonText: "Si, vamos!",
    denyButtonText: `No`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      //Swal.fire("Saved!", "", "success");
    } else if (result.isDenied) {
      Swal.fire("No puedes navegar ni comprar en este sitio", "", "info");
    }
  });
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
    botonesAgregar();
}
agregarProductos(productos);

//BOTONES DEL ASIDE
categorias.forEach((boton) => {
    boton.addEventListener("click", (e) => {

        categorias.forEach((boton => boton.classList.remove("active")));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const categoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPpal.innerText = categoria.categoria.nombre;

            const productosBtn = productos.filter((producto) => producto.categoria.id === e.currentTarget.id);
            agregarProductos(productosBtn);
        } else {
            tituloPpal.innerText = "Todos los productos";
            agregarProductos(productos);
        }
    });
});

//BOTONES DE AGREGAR
function botonesAgregar() {
    agregarBtn = document.querySelectorAll(".btnAgregar");

    agregarBtn.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosAgregadosAlCarrito; //el array se guarda en el LS

let productosAgregadosAlCarritoLS = localStorage.getItem("productosEnCarrito");


if (productosAgregadosAlCarritoLS) {
    productosAgregadosAlCarrito = JSON.parse(productosAgregadosAlCarritoLS);
    numeroActualizado();
}else{
    productosAgregadosAlCarrito = [];
}


function agregarAlCarrito(e) {
    Toastify({
        text: "producto agregado",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", 
        position: "right", 
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #6b0842, #ffd0eb)",
          borderRadius: "1rem",
          textTransform: "uppercase",
        },
        onClick: function(){} // Callback after click
      }).showToast();
    const botonesId = e.currentTarget.id;
    const agregado = productos.find(producto => producto.id === botonesId);

if (productosAgregadosAlCarrito.some(producto => producto.id === botonesId)) {
    const numeroI = productosAgregadosAlCarrito.findIndex(producto => producto.id === botonesId);
    productosAgregadosAlCarrito[numeroI].cantidad ++;
}else{
    agregado.cantidad = 1;
    productosAgregadosAlCarrito.push(agregado);
}
numeroActualizado();

localStorage.setItem("productosEnCarrito", JSON.stringify(productosAgregadosAlCarrito));

}

function numeroActualizado() {
    let nuevoNum = productosAgregadosAlCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNum
}
