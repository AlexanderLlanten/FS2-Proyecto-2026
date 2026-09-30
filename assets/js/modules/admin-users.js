"use strict";

/* =========================================================
   KYNEX - ADMIN USUARIOS
========================================================= */

import {
    defaultUsers
} from "../data/users.js";


const USERS_KEY =
    "kynex_users";


const tableBody =
    document.getElementById(
        "users-table-body"
    );


const emptyState =
    document.getElementById(
        "users-empty"
    );


/* =========================================================
   STORAGE
========================================================= */

function getUsers() {

    const stored =
        localStorage.getItem(
            USERS_KEY
        );


    if (!stored) {

        localStorage.setItem(
            USERS_KEY,
            JSON.stringify(
                defaultUsers
            )
        );

        return [
            ...defaultUsers
        ];

    }


    try {

        const parsed =
            JSON.parse(stored);


        return Array.isArray(parsed)
            ? parsed
            : [];

    } catch (error) {

        console.error(
            "No fue posible leer los usuarios.",
            error
        );

        return [];

    }

}


function saveUsers(users) {

    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );

}


/* =========================================================
   FILA
========================================================= */

function createUserRow(user) {

    return `
        <tr>

            <td>
                ${user.run}
            </td>

            <td>
                ${user.firstName}
                ${user.lastName}
            </td>

            <td>
                ${user.email}
            </td>

            <td>
                ${user.region}
            </td>

            <td>
                ${user.commune}
            </td>

            <td>

                <span class="role-badge">
                    ${user.role}
                </span>

            </td>

            <td>

                <div class="admin-actions">

                    <a
                        href="user-form.html?id=${user.id}"
                        class="admin-action-button"
                        aria-label="Editar ${user.firstName}"
                    >
                        <i class="bi bi-pencil"></i>
                    </a>


                    <button
                        type="button"
                        class="admin-action-button delete user-delete"
                        data-user-id="${user.id}"
                        aria-label="Eliminar ${user.firstName}"
                    >
                        <i class="bi bi-trash"></i>
                    </button>

                </div>

            </td>

        </tr>
    `;

}


/* =========================================================
   RENDER
========================================================= */

function renderUsers() {

    const users =
        getUsers();


    if (
        users.length === 0
    ) {

        tableBody.innerHTML =
            "";

        emptyState.classList.remove(
            "d-none"
        );

        return;

    }


    emptyState.classList.add(
        "d-none"
    );


    tableBody.innerHTML =
        users
            .map(createUserRow)
            .join("");

}


/* =========================================================
   ELIMINAR
========================================================= */

function deleteUser(userId) {

    const users =
        getUsers();


    const updatedUsers =
        users.filter(
            user =>
                user.id !== userId
        );


    saveUsers(updatedUsers);

    renderUsers();

}


/* =========================================================
   EVENT DELEGATION
========================================================= */

tableBody.addEventListener(
    "click",
    event => {

        const deleteButton =
            event.target.closest(
                ".user-delete"
            );


        if (!deleteButton) {
            return;
        }


        const userId =
            Number(
                deleteButton.dataset.userId
            );


        const confirmed =
            window.confirm(
                "¿Deseas eliminar este usuario?"
            );


        if (confirmed) {

            deleteUser(
                userId
            );

        }

    }
);


/* =========================================================
   INICIALIZACIÓN
========================================================= */

renderUsers();