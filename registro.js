document.addEventListener("DOMContentLoaded", () => {
    const formRegistro = document.getElementById("form-registro");

    if (formRegistro) {
        formRegistro.addEventListener("submit", (e) => {
            e.preventDefault();

            // 1. Obtener los productos del carrito
            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

            // 2. Verificar que el carrito no esté vacío
            if (carrito.length === 0) {
                alert("Tu carrito está vacío. Agrega productos antes de realizar una compra.");
                window.location.href = "index.html";
                return;
            }

            // 3. Guardar la información del registro de usuario
            const nombre = document.getElementById("nombre").value;
            localStorage.setItem("usuarioRegistrado", "true");
            localStorage.setItem("nombreUsuario", nombre);

            // 4. Vaciar el carrito borrándolo del localStorage
            localStorage.removeItem("carrito");

            // 5. Mostrar ventana emergente con la confirmación del éxito de la compra
            alert(`¡Compra realizada con éxito, ${nombre}! 🐾📦\n\nTu pedido ha sido procesado y tu carrito ahora está vacío. ¡Gracias por confiar en Huellas & Estilo!`);

            // 6. Redirigir a la página principal
            window.location.href = "index.html";
        });
    }
});