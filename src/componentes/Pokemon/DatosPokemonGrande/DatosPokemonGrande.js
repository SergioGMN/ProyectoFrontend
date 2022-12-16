export { DatosPokemonGrande };

import "./datosPokemonGrande.css";
import { getDatosPokemon } from "../../../service/pokeApi.js";
import { Chart } from "chart.js/auto";

function DatosPokemonGrande(pokemon) {
    let div = document.createElement("div");

    div.classList.add("flexCenterHor");

    getDatosPokemon(pokemon).then((pokemon) => {
        let recuadroPokemon = document.createElement("div");
        recuadroPokemon.id = "recuadroPokemon";
        recuadroPokemon.innerHTML = `
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
        `;

        let canvas = createChart(createData(pokemon.stats));

        recuadroPokemon.append(canvas);

        div.append(recuadroPokemon);
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

function createChart(data) {
    let config = {
        type: "radar",
        data: data,
        options: {
            responsive: true,
            elements: {
                line: {
                    borderWidth: 3,
                },
            },
            plugins: {
                legend: {
                    display: false,
                },
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.yLabel;
                    },
                },
            },
            scales: {
                r: {
                    angleLines: {
                        color: "white",
                    },
                    grid: {
                        color: "white",
                    },
                    ticks: {
                        display: true,
                        stepSize: 100,
                    },
                    suggestedMin: 0,
                    suggestedMax: 160,
                },
            },
            layout: {
                autoPadding: false,
                padding: 0,
            },
        },
    };

    let canvas = document.createElement("canvas");
    canvas.id = "chart";

    new Chart(canvas, config);

    return canvas;
}

function createData(pokemonStats) {
    pokemonStats = pokemonStats.map((stat) => stat.base_stat);

    let data = {
        labels: ["HP", "Atk", "Def", "Sp. Atk", "Sp. Def", "Vel"],
        datasets: [
            {
                label: "",
                data: pokemonStats,
                fill: true,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgb(255, 99, 132)",
                pointBackgroundColor: "rgb(255, 99, 132)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgb(255, 99, 132)",
            },
        ],
    };

    return data;
}
