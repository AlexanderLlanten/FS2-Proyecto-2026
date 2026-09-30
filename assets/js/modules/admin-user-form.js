"use strict";

console.log("admin-user-form.js cargado correctamente");

import {
    regions
} from "../data/regions.js";


import {
    cleanRun,
    isValidRun,
    isAllowedEmail,
    showFieldError,
    showFieldSuccess
} from "./validation.js";


const USERS_KEY =
    "kynex_users";


const params =
    new URLSearchParams(
        window.location.search
    );


const editingId =
    Number(
        params.get("id")
    );


const form =
    document.getElementById(
        "admin-user-form"
    );


const fields = {

    run:
        document.getElementById(
            "admin-run"
        ),

    firstName:
        document.getElementById(
            "admin-first-name"
        ),

    lastName:
        document.getElementById(
            "admin-last-name"
        ),

    email:
        document.getElementById(
            "admin-email"
        ),

    birthDate:
        document.getElementById(
            "admin-birth-date"
        ),

    role:
        document.getElementById(
            "admin-role"
        ),

    region:
        document.getElementById(
            "admin-region"
        ),

    commune:
        document.getElementById(
            "admin-commune"
        ),

    address:
        document.getElementById(
            "admin-address"
        )

};


const messages = {

    run:
        document.getElementById(
            "admin-run-message"
        ),

    firstName:
        document.getElementById(
            "admin-first-name-message"
        ),

    lastName:
        document.getElementById(
            "admin-last-name-message"
        ),

    email:
        document.getElementById(
            "admin-email-message"
        ),

    role:
        document.getElementById(
            "admin-role-message"
        ),

    region:
        document.getElementById(
            "admin-region-message"
        ),

    commune:
        document.getElementById(
            "admin-commune-message"
        ),

    address:
        document.getElementById(
            "admin-address-message"
        )

};


const statusElement =
    document.getElementById(
        "admin-user-status"
    );


/* =========================================================
   STORAGE
========================================================= */

function getUsers() {

    try {

        const users =
            JSON.parse(
                localStorage.getItem(
                    USERS_KEY
                )
                || "[]"
            );


        return Array.isArray(users)
            ? users
            : [];

    } catch (error) {

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
   REGIONES
========================================================= */

function populateRegions() {

    console.log("Regiones disponibles:", regions);

    regions.forEach(
        region => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                region.name;

            option.textContent =
                region.name;


            fields.region.appendChild(
                option
            );

        }
    );

}


function populateCommunes(
    regionName,
    selectedCommune = ""
) {

    const region =
        regions.find(
            item =>
                item.name === regionName
        );


    fields.commune.innerHTML =
        `
            <option value="">
                Selecciona una comuna
            </option>
        `;


    if (!region) {

        fields.commune.disabled =
            true;

        return;

    }


    region.communes.forEach(
        commune => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                commune;

            option.textContent =
                commune;


            if (
                commune ===
                selectedCommune
            ) {

                option.selected =
                    true;

            }


            fields.commune.appendChild(
                option
            );

        }
    );


    fields.commune.disabled =
        false;

}


/* =========================================================
   VALIDACIONES
========================================================= */

function validateRun() {

    const value =
        cleanRun(
            fields.run.value
        );


    fields.run.value =
        value;


    if (
        !value
        ||
        !isValidRun(value)
    ) {

        showFieldError(
            fields.run,
            messages.run,
            "Ingresa un RUN válido."
        );

        return false;

    }


    showFieldSuccess(
        fields.run,
        messages.run
    );

    return true;

}


function validateFirstName() {

    const value =
        fields.firstName.value
            .trim();


    if (!value) {

        showFieldError(
            fields.firstName,
            messages.firstName,
            "El nombre es obligatorio."
        );

        return false;

    }


    showFieldSuccess(
        fields.firstName,
        messages.firstName
    );

    return true;

}


function validateLastName() {

    const value =
        fields.lastName.value
            .trim();


    if (!value) {

        showFieldError(
            fields.lastName,
            messages.lastName,
            "Los apellidos son obligatorios."
        );

        return false;

    }


    showFieldSuccess(
        fields.lastName,
        messages.lastName
    );

    return true;

}


function validateEmail() {

    const value =
        fields.email.value
            .trim();


    if (
        !value
        ||
        !isAllowedEmail(value)
    ) {

        showFieldError(
            fields.email,
            messages.email,
            "Ingresa un correo válido de los dominios permitidos."
        );

        return false;

    }


    showFieldSuccess(
        fields.email,
        messages.email
    );

    return true;

}


function validateRole() {

    if (!fields.role.value) {

        showFieldError(
            fields.role,
            messages.role,
            "Selecciona un tipo de usuario."
        );

        return false;

    }


    showFieldSuccess(
        fields.role,
        messages.role
    );

    return true;

}


function validateRegion() {

    if (!fields.region.value) {

        showFieldError(
            fields.region,
            messages.region,
            "Selecciona una región."
        );

        return false;

    }


    showFieldSuccess(
        fields.region,
        messages.region
    );

    return true;

}


function validateCommune() {

    if (!fields.commune.value) {

        showFieldError(
            fields.commune,
            messages.commune,
            "Selecciona una comuna."
        );

        return false;

    }


    showFieldSuccess(
        fields.commune,
        messages.commune
    );

    return true;

}


function validateAddress() {

    const value =
        fields.address.value
            .trim();


    if (!value) {

        showFieldError(
            fields.address,
            messages.address,
            "La dirección es obligatoria."
        );

        return false;

    }


    showFieldSuccess(
        fields.address,
        messages.address
    );

    return true;

}


/* =========================================================
   CARGAR USUARIO
========================================================= */

function loadUser() {

    if (!editingId) {
        return;
    }


    const user =
        getUsers().find(
            item =>
                item.id === editingId
        );


    if (!user) {
        return;
    }


    document.getElementById(
        "user-form-title"
    ).textContent =
        "Editar usuario";


    fields.run.value =
        user.run;

    fields.firstName.value =
        user.firstName;

    fields.lastName.value =
        user.lastName;

    fields.email.value =
        user.email;

    fields.birthDate.value =
        user.birthDate || "";

    fields.role.value =
        user.role;

    fields.region.value =
        user.region;

    populateCommunes(
        user.region,
        user.commune
    );

    fields.address.value =
        user.address;

}


/* =========================================================
   SUBMIT
========================================================= */

form.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const validations = [

            validateRun(),
            validateFirstName(),
            validateLastName(),
            validateEmail(),
            validateRole(),
            validateRegion(),
            validateCommune(),
            validateAddress()

        ];


        if (
            !validations.every(Boolean)
        ) {

            statusElement.className =
                "form-status error";

            statusElement.textContent =
                "Revisa los campos marcados.";

            return;

        }


        const users =
            getUsers();


        const userData = {

            id:
                editingId
                ||
                Date.now(),

            run:
                fields.run.value,

            firstName:
                fields.firstName.value
                    .trim(),

            lastName:
                fields.lastName.value
                    .trim(),

            email:
                fields.email.value
                    .trim()
                    .toLowerCase(),

            birthDate:
                fields.birthDate.value
                || null,

            role:
                fields.role.value,

            region:
                fields.region.value,

            commune:
                fields.commune.value,

            address:
                fields.address.value
                    .trim()

        };


        if (editingId) {

            const index =
                users.findIndex(
                    user =>
                        user.id ===
                        editingId
                );


            if (index !== -1) {

                users[index] =
                    userData;

            }

        } else {

            users.push(
                userData
            );

        }


        saveUsers(users);


        statusElement.className =
            "form-status success";

        statusElement.textContent =
            "Usuario guardado correctamente.";

    }
);


/* =========================================================
   EVENTOS
========================================================= */

fields.region.addEventListener(
    "change",
    () => {

        populateCommunes(
            fields.region.value
        );

        validateRegion();

    }
);


fields.run.addEventListener(
    "blur",
    validateRun
);

fields.firstName.addEventListener(
    "blur",
    validateFirstName
);

fields.lastName.addEventListener(
    "blur",
    validateLastName
);

fields.email.addEventListener(
    "blur",
    validateEmail
);

fields.role.addEventListener(
    "change",
    validateRole
);

fields.commune.addEventListener(
    "change",
    validateCommune
);

fields.address.addEventListener(
    "blur",
    validateAddress
);


/* =========================================================
   INICIALIZACIÓN
========================================================= */

populateRegions();

loadUser();