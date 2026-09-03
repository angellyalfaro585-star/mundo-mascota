<script>
    document.addEventListener("DOMContentLoaded", () => {
        const menuBtn = document.getElementById("menu-btn");
        const navMenu = document.getElementById("nav-menu");

        if (menuBtn && navMenu) {
            menuBtn.addEventListener("click", () => {
                // Alternar la clase 'active' para mostrar/ocultar el menú
                navMenu.classList.toggle("active");
                
                // Cambiar el icono de ☰ a ✖ cuando el menú está abierto
                if (navMenu.classList.contains("active")) {
                    menuBtn.textContent = "✖";
                } else {
                    menuBtn.textContent = "☰";
                }
            });
        }
    });
</script>