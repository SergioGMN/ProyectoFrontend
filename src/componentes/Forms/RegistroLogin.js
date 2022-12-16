export { FormRegistro, FormLogin };

import "./RegistroLogin.css";
import {
    loginPass,
    registerUser,
    logoutUser,
    isLogged,
    forgotPassword,
} from "../../service/supabase/funcionesUsuario.js";

function FormRegistro() {
    let contenidoRegistro = document.createElement("div");
    contenidoRegistro.id = "contenido-registro";
    contenidoRegistro.classList.add("formRegistro");

    let formRegistro = document.createElement("form");
    let tituloRegistro = document.createElement("h3");
    let submitRegistro = document.createElement("button");
    tituloRegistro.innerHTML = "Registro";
    submitRegistro.innerHTML = "Registrar";
    submitRegistro.id = "submitRegistro";

    // TEMPLATE LITERAL
    let formRegistroHtml = `
      <label for="user-registro">Email:</label>
      <input type="text" name="user" id="user-registro">
          
      <label for="pass1-registro">Contraseña:</label>
      <input type="password" name="pass1" id="pass1-registro">
          
      <label for="pass2-registro">Repite contraseña:</label>
      <input type="password" name="pass2" id="pass2-registro">
    `;

    formRegistro.innerHTML = formRegistroHtml;
    formRegistro.append(submitRegistro);
    contenidoRegistro.append(tituloRegistro, formRegistro);

    submitRegistro.addEventListener("click", async (e) => { // FLECHA
        e.preventDefault();

        let email = document.getElementById("user-registro").value;
        let pass1 = document.getElementById("pass1-registro").value;
        let pass2 = document.getElementById("pass2-registro").value;

        if (pass1 !== pass2 || pass1.length < 8 || pass2.length < 8) {
            alert(
                "Las contraseñas deben ser iguales y tener al menos 8 caracteres!"
            );
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            alert("El email no es válido!");
            return;
        }

        if (email === "" || pass1 === "" || pass2 === "") {
            alert("Debes rellenar todos los campos!");
            return;
        }

        await registerUser(email, pass1).then((res) => { // FLECHA
            if (!res.ok) {
                console.log(res.error);
                alert(res.error.message);
            } else {
                console.log(res);
                alert("Usuario registrado correctamente!");
                window.location.hash = "#/perfil";
            }
        });
    });

    return contenidoRegistro;
}

function FormLogin() {
    let contenidoLogin = document.createElement("div");
    contenidoLogin.id = "contenido-login";
    contenidoLogin.classList.add("formLogin");

    let formLogin = document.createElement("form");
    let tituloLogin = document.createElement("h3");
    let submitLogin = document.createElement("button");
    tituloLogin.innerHTML = "Iniciar sesión";
    submitLogin.innerHTML = "Iniciar sesión";
    submitLogin.id = "submitLogin";

    let formLoginHtml = `
      <label for="user-login">Email:</label>
      <input type="text" name="user" id="user-login">
  
      <label for="pass-login">Contraseña:</label>
      <input type="password" name="pass" id="pass-login">
    `;

    let olvidoPass = document.createElement("a");
    olvidoPass.innerHTML = "¿Has olvidado tu contraseña?";
    olvidoPass.href = "#/olvidoPass";

    formLogin.innerHTML = formLoginHtml;
    formLogin.append(olvidoPass, submitLogin);
    contenidoLogin.append(tituloLogin, formLogin);

    submitLogin.addEventListener("click", async (e) => { // FLECHA
        e.preventDefault();

        let email = document.getElementById("user-login").value;
        let password = document.getElementById("pass-login").value;

        await loginPass(email, password).then((res) => { // FLECHA
            if (email == "" || password == "") {
                alert("Rellena todos los campos!");
                return;
            }

            if (res.ok === true) {
                window.location.hash = "#/perfil";
                window.location.reload(); // Para que se actualice el menú
            } else {
                alert("Usuario o contraseña incorrectos!");
            }
        });
    });

    return contenidoLogin;
}
