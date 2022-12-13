export { Menu };

import './menu.css';

let listaLinks = [
    {
        titulo: "Inicio",
        url: "#/",
    },
    {
        titulo: "Apartado 2",
        url: "lolKEK",
    },
    {
        titulo: "Registro",
        url: "#/registro",
        posicion: "derecha",
    },
];

function Menu(apartadoActivo) {
    let nav = document.createElement("nav");
    let listaLinksCreados = [];

    for (const link of listaLinks) {
        listaLinksCreados.push(generarLink(link, apartadoActivo));
    }

    nav.append(...listaLinksCreados);

    return nav;
}

function generarLink(linkACrear, apartadoActivo) {
    let link = document.createElement("a");
    let texto = document.createTextNode(linkACrear.titulo);
    link.append(texto);
    link.href = linkACrear.url;

    if (linkACrear.posicion == "derecha") {
        link.style.marginLeft = "auto";
    }

    if (linkACrear.titulo.toLowerCase() == apartadoActivo.toLowerCase()) {
        link.classList.add("active");
    }

    return link;
}
