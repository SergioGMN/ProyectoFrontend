export { Home };

import { Menu } from "../componentes/menu.js";
import { Footer } from "../componentes/footer.js";
import {DatosPokemonGrande } from "../componentes/Pokemon/DatosPokemonGrande.js";
import { BloqueSeleccionPokemon } from "../componentes/Pokemon/BloqueSeleccionPokemon.js";
import { getCookie } from "../utils/cookies.js";


async function Home(main) {
    let contenido = document.createElement("div");
    contenido.id = "contenido";

    let pokemon = getCookie("pokemon") || "pikachu";
    let gen = getCookie("gen") || 1;

    contenido.append(
        DatosPokemonGrande(pokemon),
        await BloqueSeleccionPokemon(gen)
    );

    main.append(Menu("Inicio"), contenido, Footer());
}