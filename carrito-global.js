// =======================================================
// HUELLAS & ESTILO · AGREGAR PRODUCTOS AL CARRITO
// Copia este archivo a las páginas donde tengas productos.
// =======================================================

const CLAVE_CARRITO = "huellasEstiloCarrito";

function obtenerCarrito() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || [];
    } catch (error) {
        return [];
    }
}

function agregarProductoAlCarrito(producto) {
    const carrito = obtenerCarrito();

    const existente = carrito.find(
        item => String(item.id) === String(producto.id)
    );

    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: Number(producto.precio),
            cantidad: 1
        });
    }

    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
    actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
    const contador = document.getElementById("cart-count");
    if (!contador) return;

    const total = obtenerCarrito().reduce(
        (suma, item) => suma + Number(item.cantidad || 0),
        0
    );

    contador.textContent = total;
}

document.querySelectorAll(".add-cart-btn").forEach(boton => {

    boton.addEventListener("click", () => {

        agregarProductoAlCarrito({
            id: boton.dataset.id,
            nombre: boton.dataset.nombre,
            precio: boton.dataset.precio
        });

        const textoOriginal = boton.textContent;

        boton.textContent = "✓ Agregado";
        boton.disabled = true;

        setTimeout(() => {
            boton.textContent = textoOriginal;
            boton.disabled = false;
        }, 850);
    });

});

actualizarContadorCarrito();
