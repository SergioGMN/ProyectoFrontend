export { Footer };

import "./footer.css";

function Footer() {
    let footer = document.createElement("footer");
    footer.id = "footer";

    footer.append(crearBotonSubir(), crearPie());

    return footer;
}

function crearPie() {
    let pie = document.createElement("div");
    pie.id = "pie";

    let texto = document.createElement("p");
    texto.innerHTML = "&copy; Sergio Gimeno para la asignatura Desarrollo Web en Entorno Cliente de 2º de DAW";
    pie.appendChild(texto);

    return pie;
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
