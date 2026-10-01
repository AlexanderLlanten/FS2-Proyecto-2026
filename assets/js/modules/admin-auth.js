"use strict";

/* =========================================================
   KYNEX - CONTROL DE ACCESO ADMINISTRATIVO
========================================================= */

import {
    getSession,
    logoutUser
} from "./auth.js";


/* =========================================================
   SESIÓN
========================================================= */

const session =
    getSession();


const currentPath =
    window.location.pathname;


/* =========================================================
   RAÍZ DEL PROYECTO
========================================================= */

/*
 * Permite funcionar tanto en:
 *
 * http://127.0.0.1:5500/
 *
 * como en:
 *
 * https://usuario.github.io/FS2-Proyecto-2026/
 */

function getProjectBasePath() {

    const lowerPath =
        currentPath.toLowerCase();


    const adminPosition =
        lowerPath.indexOf(
            "/admin/"
        );


    if (
        adminPosition === -1
    ) {

        return "";

    }


    return currentPath.substring(
        0,
        adminPosition
    );

}


const basePath =
    getProjectBasePath();


/* =========================================================
   RUTAS
========================================================= */

function redirectToLogin() {

    window.location.href =
        `${basePath}/pages/account/login.html`;

}


function redirectToStore() {

    window.location.href =
        `${basePath}/pages/shop/products.html`;

}


function redirectToAdmin() {

    window.location.href =
        `${basePath}/admin/index.html`;

}


/* =========================================================
   REGLAS DE ACCESO
========================================================= */

function requiresAdministrator() {

    const path =
        currentPath.toLowerCase();


    return (

        path.includes(
            "/admin/users/"
        )

        ||

        path.includes(
            "/admin/products/product-form.html"
        )

    );

}


function sellerCanAccess() {

    const path =
        currentPath.toLowerCase();


    return (

        path.endsWith(
            "/admin/index.html"
        )

        ||

        path.endsWith(
            "/admin/"
        )

        ||

        path.includes(
            "/admin/products/products.html"
        )

        ||

        path.includes(
            "/admin/orders/"
        )

    );

}


/* =========================================================
   PROTEGER PÁGINA
========================================================= */

function protectPage() {

    /*
     * Sin sesión
     */

    if (!session) {

        redirectToLogin();

        return false;

    }


    /*
     * Cliente no entra a administración
     */

    if (
        session.role ===
        "Cliente"
    ) {

        redirectToStore();

        return false;

    }


    /*
     * Zonas exclusivas de administrador
     */

    if (
        requiresAdministrator()
        &&
        session.role !==
            "Administrador"
    ) {

        redirectToAdmin();

        return false;

    }


    /*
     * Vendedor solo entra a:
     *
     * - panel
     * - productos
     * - pedidos
     */

    if (
        session.role ===
            "Vendedor"
        &&
        !sellerCanAccess()
    ) {

        redirectToAdmin();

        return false;

    }


    return true;

}


/* =========================================================
   VISIBILIDAD
========================================================= */

function applyRoleVisibility() {

    if (!session) {

        return;

    }


    /*
     * Solo administrador
     */

    document
        .querySelectorAll(
            "[data-admin-only]"
        )
        .forEach(
            element => {

                const visible =
                    session.role ===
                    "Administrador";


                element.classList.toggle(
                    "d-none",
                    !visible
                );

            }
        );


    /*
     * Administrador + vendedor
     */

    document
        .querySelectorAll(
            "[data-seller-access]"
        )
        .forEach(
            element => {

                const visible =
                    [
                        "Administrador",
                        "Vendedor"
                    ].includes(
                        session.role
                    );


                element.classList.toggle(
                    "d-none",
                    !visible
                );

            }
        );

}


/* =========================================================
   DATOS DE SESIÓN
========================================================= */

function renderSessionInfo() {

    const container =
        document.getElementById(
            "admin-session"
        );


    if (!container) {

        return;

    }


    container.innerHTML =
        `
            <div class="admin-session-info">

                <div>

                    <strong>
                        ${session.firstName}
                        ${session.lastName || ""}
                    </strong>

                    <small>
                        ${session.role}
                    </small>

                </div>


                <button
                    type="button"
                    class="btn btn-kynex-secondary"
                    id="admin-logout"
                >

                    <i class="bi bi-box-arrow-right"></i>

                    Cerrar sesión

                </button>

            </div>
        `;


    const logoutButton =
        document.getElementById(
            "admin-logout"
        );


    logoutButton?.addEventListener(
        "click",
        () => {

            logoutUser();

            redirectToLogin();

        }
    );

}


/* =========================================================
   INICIALIZACIÓN
========================================================= */

const accessAllowed =
    protectPage();


if (
    accessAllowed
) {

    applyRoleVisibility();

    renderSessionInfo();

}