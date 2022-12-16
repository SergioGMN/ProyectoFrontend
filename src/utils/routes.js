export { Route }

import { Home } from "../views/Home/home.js";
import { Registro } from "../views/Registro/registro.js";
import { NotFound } from "../views/NotFound/NotFound.js";
import { OlvidoPass } from "../views/OlvidoPass/OlvidoPass.js";
import { Perfil } from "../views/Perfil/Perfil.js";

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
        
        case "#/olvidoPass":
            OlvidoPass(main);
            break;

        case "#/perfil":
            Perfil(main);
            break;

        default:
            NotFound(main);
            break;
    }
}