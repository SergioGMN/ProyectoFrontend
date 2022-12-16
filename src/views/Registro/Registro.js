export { Registro };


import { Menu } from "../../componentes/Menu/Menu.js";
import { FormRegistro, FormLogin } from "../../componentes/Forms/RegistroLogin.js";

function Registro(main) {
    // Form registro
    let contenidoRegistro = FormRegistro();
  
    // Form login
    let contenidoLogin = FormLogin();

    let wrapper = document.createElement("div");

    // Wrapper para que los formularios se muestren en una misma linea
    wrapper.classList.add("wrapper-forms");
    wrapper.append(contenidoRegistro, contenidoLogin);

    main.append(Menu("Login"), wrapper);
    document.title = "Login";
}