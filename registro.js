document.addEventListener("DOMContentLoaded", () => {
    const formRegistro = document.getElementById("form-registro");

    if (formRegistro) {
        formRegistro.addEventListener("submit", (e) => {
            e.preventDefault(); // Evita que la página se recargue o intente ir a otra página

            // Obtenemos los valores ingresados en los campos
            const nombre = document.getElementById("nombre").value;
            const correo = document.getElementById("correo").value;
            
            // Esta es la clave mágica que el código de tu carrito estaba esperando
            localStorage.setItem("usuarioRegistrado", "true");
            
            // Guardamos el nombre del usuario para personalizar la experiencia si lo deseas
            localStorage.setItem("nombreUsuario", nombre);

            // Mostramos un mensaje de éxito
            alert(`¡Bienvenido/a a Huellas & Estilo, ${nombre}! Tu registro fue exitoso.`);

            // Redirigimos de vuelta al carrito para que pueda hacer clic en Pagar
            window.location.href = "carrito.html";
        });
    }
});