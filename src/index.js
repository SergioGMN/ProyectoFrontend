import { Route } from "../utils/routes.js";

(() => {
    document.addEventListener("DOMContentLoaded", () => {
        const MAIN = document.querySelector("#main");

        Route(window.location.hash, MAIN);

        window.addEventListener("hashchange", () => {
            Route(window.location.hash, MAIN);
        });
    });
})();
