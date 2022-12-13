export { Footer };

function Footer() {
    let footer = document.createElement("footer");
    footer.id = "footer";

    footer.append(crearBotonSubir());

    return footer;
}

function crearBotonSubir() {
    let botonSubir = document.createElement("button");
    botonSubir.id = "boton-subir";
    botonSubir.innerHTML = "Subir";
    botonSubir.style.display = "none";

    botonSubir.addEventListener("click", () => {
        window.scrollTo({
            behavior: "smooth",
            top: 0,
        });
    });

    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            botonSubir.style.display = "block";
        } else {
            botonSubir.style.display = "none";
        }
    });

    return botonSubir;
}
