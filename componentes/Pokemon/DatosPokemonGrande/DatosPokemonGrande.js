export { DatosPokemonGrande };

import "./datosPokemonGrande.css";
import { getDatosPokemon } from "../../../service/pokeApi.js";

function DatosPokemonGrande(pokemon) {
    let div = document.createElement("div");

    div.classList.add("flexCenterHor");

    getDatosPokemon(pokemon).then((pokemon) => {
        div.innerHTML = `
    <div id="recuadroPokemon">
        <div class="bloqueFlex">
            <h1>${capitalizarPrimeraLetra(pokemon.species.name)}</h1>
            <div class="hor">
                ${generarRecuadrosTipo(pokemon.types)}
            </div>
            <div id="stats">
                <div class="stats">
                <p>${pokemon.stats[1].base_stat} Atk</p>
                <p>${pokemon.stats[2].base_stat} Def</p>
                <p>${pokemon.stats[0].base_stat} HP</p>
                </div>
                <div class="stats">
                    <p>${pokemon.stats[3].base_stat} Sp. Atk</p>
                    <p>${pokemon.stats[4].base_stat} Sp. Def</p>
                    <p>${pokemon.stats[5].base_stat} Vel</p>
                </div>
            </div>
        </div>

        <div class="bloqueFlex">
            <img src="${
                pokemon.sprites.other["official-artwork"].front_default
            }" alt="Ditto xD">
            </div>
            
            <div class="gridMovimientos">
            <div class="movimiento electrico">Impactrueno</div>
            <div class="movimiento volador">Vuelo</div>
            <div class="movimiento fuego">Lanzallamas</div>
            <div class="movimiento agua">Surf</div>
            </div>
            </div>
            `;
    });

    return div;
}

// Se usa en los nombres de los pokemon, que vienen en minúscula de la API
function capitalizarPrimeraLetra(palabra) {
    return (
        palabra.charAt(0).toUpperCase() + palabra.substring(1, palabra.length)
    );
}

function generarRecuadrosTipo(tipos) {
    let traduccion = {
        normal: "Normal",
        fighting: "Lucha",
        flying: "Volador",
        poison: "Veneno",
        ground: "Tierra",
        rock: "Roca",
        bug: "Bicho",
        ghost: "Fantasma",
        steel: "Acero",
        fire: "Fuego",
        water: "Agua",
        grass: "Planta",
        electric: "Eléctrico",
        psychic: "Psíquico",
        ice: "Hielo",
        dragon: "Dragón",
        dark: "Siniestro",
        fairy: "Hada",
    };

    return tipos
        .map((tipo) => {
            return `<div class="tipo ${tipo.type.name}" id="tipo2">${
                traduccion[tipo.type.name]
            }</div>`;
        })
        .join("");
}