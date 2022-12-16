export {
    loginUsuario,
    registrarUsuario,
    logoutUsuario,
    recoverPassword,
    getUserData,
    updateData,
    createData,
    fetchDatosUsuarioLogeado,
    getDatosUsuarioLogeado,
};

import { createClient } from "@supabase/supabase-js";

const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFreXF2b3VmYnl2dG11eW94cWFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkzMDIwNjIsImV4cCI6MTk4NDg3ODA2Mn0.YCfPccSroZ1YFe3dUGeqf6_-Q8X2pPLYK5ofoPyHSG4";
const URI_BASE = "https://akyqvoufbyvtmuyoxqac.supabase.co";
const HEADERS = {
    apiKey: SUPABASE_KEY,
    "Content-Type": "application/json",
};

const supabase = createClient(URI_BASE, SUPABASE_KEY);

async function requestSupabase(url, method, headers, body) {
    let response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(body),
    });

    // Si error
    if (response.status < 200 || response.status >= 300) {
        return Promise.reject(await response.json());
    }

    // Si es un json
    if (response.headers.get("content-type")) {
        return await response.json();
    }

    return {};
}

async function registrarUsuario(email, password) {
    let url = `${URI_BASE}/auth/v1/signup?grant_type=password`;
    let data = await requestSupabase(url, "POST", HEADERS, { email, password });
    return data;
}

async function loginUsuario(email, password) {
    let url = `${URI_BASE}/auth/v1/token?grant_type=password`;
    let data = await requestSupabase(url, "POST", HEADERS, { email, password });

    return data;
}

async function logoutUsuario(token) {
    let url = `${URI_BASE}/auth/v1/logout`;
    let headersExtra = { ...headers, Authorization: "Bearer " + token };
    let data = await requestSupabase(url, "POST", headersExtra);
    return data;
}

async function recoverPassword(email) {
    let url = `${URI_BASE}/auth/v1/recover`;
    let data = await requestSupabase(url, "POST", HEADERS, { email });
    return data;
}

// Con la libreria de supabase porque no se hacerlo con fetch

async function getUserData(userEmail) {
    let { data: datos, error } = await supabase
        .from("datos_usuario")
        .select("*")
        .ilike("email", "%" + userEmail + "%");

    return datos;
}

async function updateData(URI, token, data) {
    let url = `${URI_BASE}/rest/v1/${URI}`;
    let headersExtra = {
        ...HEADERS,
        Authorization: "Bearer " + token,
        Prefer: "return=representation",
    };
    let response = await requestSupabase(url, "PATCH", headersExtra, data);
    return response;
}

async function createData() {
    let { data, error } = await supabase
        .from("datos_usuario")
        .insert([{ email: "someValue" }, { user_id: "otherValue" }]);
}

async function fetchDatosUsuarioLogeado(token) {
    const {
        data: { user },
    } = await supabase.auth.getUser(token);

    return user;
}

async function getDatosUsuarioLogeado() {
    let access_token = localStorage.getItem("access_token");

    fetchDatosUsuarioLogeado(access_token);
}
