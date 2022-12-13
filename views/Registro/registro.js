export { Registro };

import "./registro.css";
import { Menu } from "../../componentes/Menu/menu.js";

function Registro(main) {
    // Form registro
    let contenidoRegistro = document.createElement("div");
    contenidoRegistro.id = "contenido-registro";
    contenidoRegistro.classList.add("formRegistro");

    let formRegistro = document.createElement("form");
    let tituloRegistro = document.createElement("h3");
    tituloRegistro.innerHTML = "Registro";
  
    let formRegistroHtml = `
      <label for="user-registro">Usuario:</label>
      <input type="text" name="user" id="user-registro">
          
      <label for="pass1-registro">Contraseña:</label>
      <input type="password" name="pass1" id="pass1-registro">
          
      <label for="pass2-registro">Repite contraseña:</label>
      <input type="password" name="pass2" id="pass2-registro">
  
      <button type="submit">Registrar</button>
    `;
  
    formRegistro.innerHTML = formRegistroHtml;
  
    // Form login
    let contenidoLogin = document.createElement("div");
    contenidoLogin.id = "contenido-login";
    contenidoLogin.classList.add("formLogin");

    let formLogin = document.createElement("form");
    let tituloLogin = document.createElement("h3");
    tituloLogin.innerHTML = "Iniciar sesión";
  
    let formLoginHtml = `
      <label for="user-login">Usuario:</label>
      <input type="text" name="user" id="user-login">
  
      <label for="pass-login">Contraseña:</label>
      <input type="password" name="pass" id="pass-login">
  
      <button type="submit">Iniciar sesión</button>
    `;
  
    formLogin.innerHTML = formLoginHtml;
  
    contenidoRegistro.append(tituloRegistro, formRegistro);
    contenidoLogin.append(tituloLogin, formLogin);

    let wrapper = document.createElement("div");

    // Wrapper para que los formularios se muestren en una misma linea
    wrapper.classList.add("wrapper-forms");
    wrapper.append(contenidoRegistro, contenidoLogin);

    main.append(Menu("Registro"), wrapper);
}