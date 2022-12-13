export { Route }

import { Home } from "../views/Home/home.js";
import { Registro } from "../views/Registro/registro.js";
import { NotFound } from "../views/NotFound/NotFound.js";

function Route(ruta, main) {
    if (ruta == "") ruta = "#/";

    main.innerHTML = "";

    switch (ruta) {
        case "#/":
            Home(main);
            break;

        case "#/registro":
            Registro(main);
            break;
        default:
            NotFound(main);
            break;
    }
}