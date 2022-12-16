export {
    loginPass,
    registerUser,
    logoutUser,
    isLogged,
    forgotPassword,
    updateProfile,
};

import {
    loginUsuario,
    registrarUsuario,
    logoutUsuario,
    recoverPassword,
    getData,
    updateData,
    createData,
    fetchDatosUsuarioLogeado,
} from "./peticionesApi.js";

function expirationDate(expires_in) {
    return Math.floor(Date.now() / 1000) + expires_in;
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
            Math.floor(Date.now() / 1000)
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

async function updateProfile(profile) {
    let access_token = localStorage.getItem("access_token");
    let uid = localStorage.getItem("uid");

    let formImg = new FormData();
    formImg.append("avatar", profile.avatar, "avatarProfile.png");

    console.log(formImg);

    let avatarResponse = await fileRequest(
        `/storage/v1/object/avatars/avatar${uid}.png`,
        formImg,
        access_token
    );

    profile.avatar_url = avatarResponse.urlAvatar;
    delete profile.avatar;

    let responseUpdate = await updateData(
        `profiles?id=eq.${uid}&select=*`,
        access_token,
        profile
    );
}

// async function getProfile() {
//     let access_token = localStorage.getItem("access_token");
//     let uid = localStorage.getItem("uid");
//     let responseGet = await getData(
//         `profiles?id=eq.${uid}&select=*`,
//         access_token
//     );
//     let avatar_url = responseGet[0].avatar_url;
//     responseGet[0].avatar_blob = false;
//     if (avatar_url) {
//         let imageBlob = await getFileRequest(avatar_url, access_token);
//         if (imageBlob instanceof Blob) {
//             responseGet[0].avatar_blob = URL.createObjectURL(imageBlob);
//         }
//     }
//     return responseGet;
// }