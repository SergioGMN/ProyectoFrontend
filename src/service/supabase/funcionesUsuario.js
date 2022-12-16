export {
    loginPass,
    registerUser,
    logoutUser,
    isLogged,
    forgotPassword,
};

import {
    loginUsuario,
    registrarUsuario,
    logoutUsuario,
    recoverPassword,
} from "./peticionesApi.js";

function expirationDate(expires_in) {
    return Math.floor(Date.now() / 1000) + expires_in; // OBJETO PREDEFINIDO
}

async function loginPass(email, password) {
    let status = { ok: false, message: "" };

    try {
        let data = await loginUsuario(email, password);
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("expirationDate", expirationDate(data.expires_in));

        status.ok = true;
        status.message = "Login correcto";
    } catch (error) {
        status.message = error.error_description;
    }

    return status;
}

async function registerUser(email, password) {
    let status = { ok: false, message: "" };

    try {
        let data = await registrarUsuario(email, password);
        status.ok = true;
        status.message =
            "Registro correcto, revisa tu correo para activar la cuenta";
    } catch (error) {
        status.message = error.error_description;
    }

    return status;
}

async function logoutUser() {
    let token = localStorage.getItem("access_token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("expirationDate");
    await logoutUsuario(token);
}

function isLogged() {
    if (localStorage.getItem("access_token")) {
        if (
            localStorage.getItem("expirationDate") >
            Math.floor(Date.now() / 1000) // OBJETO PREDEFINIDO
        ) {
            return true;
        }
    }
    return false;
}

async function forgotPassword(email) {
    let responseForgot = await recoverPassword(email);
    console.log(responseForgot);
}