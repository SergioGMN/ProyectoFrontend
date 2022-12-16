export { getDatosPokemon, getListaPokemon };

// Cada generación introduce un número de pokémon y la lista es correlativa
// Ejemplo la generación 1 va desde 1 hasta 151
// Generación 2 desde 152 hasta 251
// Se pueden usar para el limit/offset
//OBJETO LITERAL
const OFFSET_GEN = {
    1: { offset: 0, limit: 151 },
    2: { offset: 151, limit: 100 },
    3: { offset: 251, limit: 135 },
    4: { offset: 386, limit: 107 },
    5: { offset: 493, limit: 156 },
    6: { offset: 649, limit: 72 },
    7: { offset: 721, limit: 88 },
    8: { offset: 809, limit: 89 },
};

/* 
Los pokemon son demasiado grandes como para guardarlos en el localStorage
Por eso antes de guardarse se guardan solo los datos que se van a usar
*/
function guardarDatosEssencialesPokemon(pokemon) {
    //OBJETO LITERAL
    let datos = {
        id: pokemon.id,
        species: {
            name: pokemon.species.name,
        },
        types: pokemon.types,
        stats: pokemon.stats,
        sprites: {
            front_default: pokemon.sprites.front_default,
            other: {
                "official-artwork": {
                    front_default:
                        pokemon.sprites.other["official-artwork"].front_default,
                },
            },
        },
    };

    localStorage.setItem(pokemon.name, JSON.stringify(datos));
}

async function getDatosPokemon(pokemon) {
    // Comprueba si los datos del pokemon están en el localStorage
    let datosPokemon = localStorage.getItem(pokemon);

    if (datosPokemon) {
        datosPokemon = JSON.parse(datosPokemon);
        return datosPokemon;
    } else {
        // Si no están los pide a la API
        let resultadoFetch = await fetch( // FETCH
            `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        );
        let json = await resultadoFetch.json();
        guardarDatosEssencialesPokemon(json);
        return json;
    }
}

async function getListaPokemon(gen) {
    let offset = OFFSET_GEN[gen].offset;
    let limit = OFFSET_GEN[gen].limit;
    // Comprueba si la lista de pokemon está en el localStorage
    let listaPokemon = localStorage.getItem(`listaPokemon${gen}`);

    if (listaPokemon) {
        listaPokemon = JSON.parse(listaPokemon);
        return listaPokemon;
    } else {
        // Si no están los pide a la API
        let resultadoFetch = await fetch( // FETCH
            `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );
        listaPokemon = await resultadoFetch.json(); 
        localStorage.setItem(
            `listaPokemon${gen}`,
            JSON.stringify(listaPokemon) // OBJETO PREDEFINIDO
        );
    }

    return listaPokemon;
}
