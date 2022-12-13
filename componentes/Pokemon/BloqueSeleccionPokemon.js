export { BloqueSeleccionPokemon };

import { getDatosPokemon, getListaPokemon } from "../../service/pokeApi.js";
import { DatosPokemonGrande } from "./DatosPokemonGrande.js";

async function BloqueSeleccionPokemon(gen) {
    let div = document.createElement("div");

    div.id = "selectorPokemon";

    let listaDivs = await generarDivsListaPokemones(gen);
    let listaPokemon = document.createElement("div");
    listaPokemon.classList.add("listaPokemon");
    listaPokemon.id = "listaPokemon";
    listaPokemon.append(...listaDivs);

    div.append(await generarMenuSeleccionGeneracion(gen), listaPokemon);

    return div;
}

async function generarMenuSeleccionGeneracion(gen) {
    let menuGeneraciones = document.createElement("div");
    menuGeneraciones.classList.add("listaGeneraciones");

    for (let i = 1; i <= 8; i++) {
        let opcionGen = document.createElement("div");
        opcionGen.innerHTML = `Gen ${i}`;
        opcionGen.id = `gen${i}`;

        opcionGen.addEventListener("click", () => {
            selectGeneracion(opcionGen.id);
        });

        // Se añaade la clase active a la generación activa
        if (i == gen) {
            opcionGen.classList.add("active");
        }

        menuGeneraciones.append(opcionGen);
    }

    return menuGeneraciones;
}

async function generarDivsListaPokemones(gen) {
    let listaPokemon = await getListaPokemon(gen);

    let listaElementos = [];
    for (let pokemon of listaPokemon.results) {
        let datosPokemon = await getDatosPokemon(pokemon.name);

        let div = document.createElement("div");

        div.classList.add("contSprite");
        div.id = `pokeSlot${datosPokemon.id}`;
        div.innerHTML = `
        <img src="${datosPokemon.sprites.front_default}" alt="Sprite de ${
            pokemon.name
        }" />
        ${padNum(datosPokemon.id)}
        `;

        // Al pulsar en un pokemon se cambia el pokemon principal
        div.addEventListener("click", () => {
            selectPokemon(pokemon);
        });

        listaElementos.push(div);
    }

    return listaElementos;
}

async function reGenerarMenuSeleccionPokemon(gen) {
    // Comprueba si la generación seleccionada es la misma que la que ya está activa para no hacer nada
    if (document.querySelector(`#gen${gen}`).classList.contains("active")) {
        return;
    }

    // Quita el activo de la lista de generaciones
    let listaGen = document.querySelectorAll(".listaGeneraciones div");
    listaGen.forEach((gen) => {
        gen.classList.remove("active");
    });

    // Añade el activo a la generación seleccionada
    listaGen[gen - 1].classList.add("active");

    // Elimina la lista de pokemones anterior poniendo el mensaje de cargando
    let listaPokemon = document.querySelector("#listaPokemon");

    let gifCargando = document.createElement("img");
    gifCargando.src = "./img/loading.gif";
    gifCargando.classList.add("cargando");
    listaPokemon.innerHTML = "";
    listaPokemon.append(gifCargando);

    // Una vez cargado, se quita el gif y se añaden los nuevos bichos
    let listaDivs = await generarDivsListaPokemones(gen);
    listaPokemon.innerHTML = "";
    listaPokemon.append(...listaDivs);
}

function selectPokemon(pokemon) {
    // Al pulsar un pokemon, si el scroll está abajo, se sube al recuadro del pokemon
    // Está hecho así porque si no, la pagina no da feedback de nada y parece que no funciona
    let recuadro = document.querySelector("#recuadroPokemon");
    recuadro.scrollIntoView({ behavior: "smooth" });
    // Hay que seleccionar el parent porque sino hace una piramide de divs increible
    let divPokemon = document.querySelector("#recuadroPokemon").parentElement;
    divPokemon.replaceWith(DatosPokemonGrande(pokemon.name));

    // Se guarda en cookies así al recargar la pagina se guarda el pokemon seleccionado
    // No hay tiempo de caducidad porque no pasa nada si se borra enseguida, es solo para que no se
    // resetee todo el rato al recargar o moverte entre menús
    document.cookie = `pokemon=${pokemon.name}`;
}

function selectGeneracion(opcionGen) {
    let gen = opcionGen.slice(3);
    reGenerarMenuSeleccionPokemon(gen);
    document.cookie = `gen=${gen}`;
}

// Función overengineered para que los numeros sigan este formato: #001 #050 #314
function padNum(num) {
    let str = num.toString();
    let pad = "000";

    return "#" + pad.substring(0, pad.length - str.length) + str;
}