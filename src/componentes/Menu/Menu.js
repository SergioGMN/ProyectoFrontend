export { Menu };

import { isLogged } from '../../service/supabase/funcionesUsuario';

import './menu.css';

let listaLinks = [
    {
        titulo: "Inicio",
        url: "#/",
    },
    {
        titulo: "Apartado 2",
        url: "#/apartado2",
    },
    {
        titulo: "Login",
        url: "#/registro",
        posicion: "derecha",
    },
];

// Si el usuario está logeado, se cambia el link de login por el de perfil
if (isLogged()) {
    listaLinks = [
        {
            titulo: "Inicio",
            url: "#/",
        },
        {
            titulo: "Apartado 2",
            url: "#/apartado2",
        },
        {
            titulo: "Perfil",
            url: "#/perfil",
            posicion: "derecha",
        },
    ];
}

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
