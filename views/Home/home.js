export { Home };

import "./style.css";
import { Menu } from "../../componentes/Menu/Menu.js";
import { Footer } from "../../componentes/Footer/Footer.js";
import { DatosPokemonGrande } from "../../componentes/Pokemon/DatosPokemonGrande/DatosPokemonGrande.js";
import { BloqueSeleccionPokemon } from "../../componentes/Pokemon/BloqueSeleccionPokemon/BloqueSeleccionPokemon.js";
import { getCookie } from "../../utils/cookies.js";

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
    document.title = "Inicio";
}
