import { Route } from "./utils/routes.js";

(() => { // FLECHA
    document.addEventListener("DOMContentLoaded", () => { // FLECHA
        const MAIN = document.querySelector("#main"); // QUERY SELECTOR

        Route(window.location.hash, MAIN);

        window.addEventListener("hashchange", () => { // FLECHA
            Route(window.location.hash, MAIN);
        });
    });
})();
