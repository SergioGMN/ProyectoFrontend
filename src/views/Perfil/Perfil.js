export { Perfil };

import './Perfil.css';

import { Menu } from "../../componentes/Menu/Menu.js";
import { Footer } from "../../componentes/Footer/Footer.js";
import { isLogged, logoutUser } from "../../service/supabase/funcionesUsuario.js";

async function Perfil(main) {
    if (!isLogged()) {
        window.location.hash = "#/registro";
        return;
    }

    let contenido = document.createElement("div");
    contenido.id = "contenido";

    contenido.append(
        Menu("Perfil"),
        crearPerfil(await getUserData()),
        Footer()
    );

    main.append(contenido);
    document.title = "Perfil";
}

function crearPerfil() {
    let perfil = document.createElement("div");
    perfil.id = "perfil";    

    let perfilHtml = `
        <div id="perfil-usuario">
            <div id="perfil-usuario-img">
                <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*" alt="Imagen de perfil" id="fotoPerfil">
            </div>
            <div id="perfil-info">
                <div id="info-nombre">
                    <h2>Nombre</h2>
                    <p>Nombre del usuario</p>
                </div>
                <div id="info-email">
                    <h2>Email</h2>
                    <p>Email del usuario</p>
                </div>
                <div>
                    <button id="logout">Cerrar sesión</button>
                </div>
            </div>
        </div>
    `;

    perfil.innerHTML = perfilHtml;

    // QUERY SELECTOR a un elemento que no existe en el DOM todavía (ojalá haberlo sabido antes)
    perfil.querySelector("#logout").addEventListener("click", () => {
        logoutUser();
        window.location.hash = "#/registro";
        window.location.reload(); // Sin esto no se actualiza correctamente el logoutUser()
    });

    return perfil;
}