export { NotFound };

import { Menu } from "../componentes/menu.js";

function NotFound(main) {
    let contenido = document.createElement("div");
    let img = document.createElement("img");
    let h2sup = document.createElement("h2")
    let txtH2sup = document.createTextNode("Pagina no esite");

    let h2inf = document.createElement("h2")
    let txtH2inf = document.createTextNode("Lo sintiemos");

    h2sup.append(txtH2sup);
    h2inf.append(txtH2inf);
    
    img.src = "./img/404.webp";
    contenido.classList.add("notFound");
    contenido.id = "contenido";
    contenido.append(h2sup, img, h2inf);

    main.append(Menu(""), contenido);
}
