export { OlvidoPass };

import './OlvidoPass.css';
import { Menu } from "../../componentes/Menu/Menu.js";
import { forgotPassword } from "../../service/supabase/funcionesUsuario.js";
import { Footer } from '../../componentes/Footer/Footer';

function OlvidoPass(main) {
    let contenido = document.createElement("div");
    contenido.id = "contenido";
    contenido.classList.add("formOlvidoPass");

    contenido.append(crearForm());

    main.append(Menu("Registro"), contenido, Footer());
}

function crearForm() {
    let formOlvidoPass = document.createElement("form");

    let submitOlvidoPass = document.createElement("button");
    submitOlvidoPass.innerHTML = "Recuperar contraseña";
    submitOlvidoPass.id = "submitOlvidoPass";

    let formOlvidoPassHtml = `
        <label for="user-olvidoPass">Email:</label>
        <input type="text" name="user" id="user-olvidoPass">
    `;

    formOlvidoPass.innerHTML = formOlvidoPassHtml;
    formOlvidoPass.append(submitOlvidoPass);

    submitOlvidoPass.addEventListener("click", async (e) => {
        e.preventDefault();

        let email = document.getElementById("user-olvidoPass").value;

        if (email == "") {
            alert("Rellena todos los campos!");
            return;
        }

        await forgotPassword(email);
    });

    return formOlvidoPass;
}