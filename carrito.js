document.addEventListener("DOMContentLoaded", () => {
    const cartBody = document.getElementById("cart-body");
    const subtotalElement = document.getElementById("cart-subtotal");
    const envioElement = document.getElementById("cart-envio");
    const totalElement = document.getElementById("cart-total");
    const btnVaciar = document.getElementById("btn-vaciar");
    const btnPagar = document.getElementById("btn-pagar");
    const COSTO_ENVIO = 3.00;

    // Obtener productos de la memoria del navegador o crear un arreglo vacío
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Función principal para dibujar la tabla
    function renderizarCarrito() {
        if (!cartBody) return;
        cartBody.innerHTML = "";
        let subtotal = 0;

        if (carrito.length === 0) {
            cartBody.innerHTML = `<tr><td colspan="4" style="text-align: center; padding: 30px; color: #636e72;">Tu carrito está vacío. ¡Agrega algunos productos!</td></tr>`;
            if (subtotalElement) subtotalElement.textContent = "$0.00";
            if (envioElement) envioElement.textContent = "$0.00";
            if (totalElement) totalElement.textContent = "$0.00";
            return;
        }

        carrito.forEach((producto, index) => {
            subtotal += producto.precio * producto.cantidad;

            const tr = document.createElement("tr");
            tr.style.borderBottom = "1px solid #f1f2f6";
            
            tr.innerHTML = `
                <td style="padding: 15px 10px;"><strong>${producto.nombre}</strong></td>
                <td style="padding: 15px 10px; color: var(--primary, #333); font-weight: bold;">$${producto.precio.toFixed(2)}</td>
                <td style="padding: 15px 10px; text-align: center;">
                    <div style="display: inline-flex; align-items: center; gap: 8px; background: #f1f2f6; padding: 4px 10px; border-radius: 20px;">
                        <button class="btn-restar" data-index="${index}" style="border: none; background: transparent; cursor: pointer; font-weight: bold; font-size: 1.1rem;">-</button>
                        <span style="font-weight: bold; width: 20px;">${producto.cantidad}</span>
                        <button class="btn-sumar" data-index="${index}" style="border: none; background: transparent; cursor: pointer; font-weight: bold; font-size: 1.1rem;">+</button>
                    </div>
                </td>
                <td style="padding: 15px 10px; text-align: center;">
                    <button class="btn-eliminar" data-index="${index}" style="background: transparent; border: none; color: #ff7675; cursor: pointer; font-size: 1.2rem; transition: transform 0.2s;">🗑️</button>
                </td>
            `;
            cartBody.appendChild(tr);
        });

        // Actualizar totales
        if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        if (envioElement) envioElement.textContent = `$${COSTO_ENVIO.toFixed(2)}`;
        if (totalElement) totalElement.textContent = `$${(subtotal + COSTO_ENVIO).toFixed(2)}`;
    }

    // Escuchar clics en los botones de sumar, restar o eliminar
    if (cartBody) {
        cartBody.addEventListener("click", (e) => {
            const boton = e.target.closest("button");
            if (!boton) return;

            const index = boton.getAttribute("data-index");
            if (index === null) return;

            if (boton.classList.contains("btn-sumar")) {
                carrito[index].cantidad++;
            } else if (boton.classList.contains("btn-restar")) {
                if (carrito[index].cantidad > 1) {
                    carrito[index].cantidad--;
                }
            } else if (boton.classList.contains("btn-eliminar")) {
                carrito.splice(index, 1);
            }
            
            // Guardar cambios en memoria y volver a dibujar
            localStorage.setItem("carrito", JSON.stringify(carrito));
            renderizarCarrito();
        });
    }

    // Botón Vaciar
    if (btnVaciar) {
        btnVaciar.addEventListener("click", () => {
            if (carrito.length === 0) return alert("El carrito ya está vacío.");
            if (confirm("¿Estás seguro de que deseas eliminar todos los productos del carrito?")) {
                carrito = [];
                localStorage.setItem("carrito", JSON.stringify(carrito));
                renderizarCarrito();
            }
        });
    }

    // Botón Pagar (con lógica de usuario)
    if (btnPagar) {
        btnPagar.addEventListener("click", () => {
            if (carrito.length === 0) {
                return alert("Tu carrito está vacío. ¡Agrega productos primero!");
            }

            const tieneCuenta = localStorage.getItem("usuarioRegistrado");
            if (!tieneCuenta) {
                if (confirm("Para realizar la compra necesitas iniciar sesión o crear una cuenta. ¿Deseas ir a la página de registro?")) {
                    window.location.href = "registro.html";
                }
            } else {
                const totalActual = totalElement ? totalElement.textContent : "";
                if (confirm(`¿Aceptas realizar la compra por un total de ${totalActual}?`)) {
                    alert("¡Compra realizada con éxito! Tu pedido está en camino 🐶📦");
                    carrito = []; // Vaciamos tras la compra
                    localStorage.setItem("carrito", JSON.stringify(carrito));
                    renderizarCarrito();
                }
            }
        });
    }

    // Iniciar dibujando el carrito
    renderizarCarrito();
});