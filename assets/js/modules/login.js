"use strict";

/* =========================================================
   KYNEX - LOGIN
========================================================= */

import {
    isAllowedEmail,
    showFieldError,
    showFieldSuccess
} from "./validation.js";


/* =========================================================
   ELEMENTOS
========================================================= */

const form =
    document.getElementById(
        "login-form"
    );


const email =
    document.getElementById(
        "login-email"
    );


const password =
    document.getElementById(
        "login-password"
    );


const emailMessage =
    document.getElementById(
        "login-email-message"
    );


const passwordMessage =
    document.getElementById(
        "login-password-message"
    );


const statusElement =
    document.getElementById(
        "login-status"
    );


const passwordToggle =
    document.getElementById(
        "password-toggle"
    );


/* =========================================================
   EMAIL
========================================================= */

function validateEmail() {

    const value =
        email.value
            .trim();


    if (!value) {

        showFieldError(
            email,
            emailMessage,
            "El correo electrónico es obligatorio."
        );

        return false;

    }


    if (value.length > 100) {

        showFieldError(
            email,
            emailMessage,
            "El correo no puede superar 100 caracteres."
        );

        return false;

    }


    if (!isAllowedEmail(value)) {

        showFieldError(
            email,
            emailMessage,
            "Utiliza un correo @duoc.cl, @profesor.duoc.cl o @gmail.com."
        );

        return false;

    }


    showFieldSuccess(
        email,
        emailMessage
    );

    return true;

}


/* =========================================================
   PASSWORD
========================================================= */

function validatePassword() {

    const value =
        password.value;


    if (!value) {

        showFieldError(
            password,
            passwordMessage,
            "La contraseña es obligatoria."
        );

        return false;

    }


    if (
        value.length < 4
        ||
        value.length > 10
    ) {

        showFieldError(
            password,
            passwordMessage,
            "La contraseña debe contener entre 4 y 10 caracteres."
        );

        return false;

    }


    showFieldSuccess(
        password,
        passwordMessage
    );

    return true;

}


/* =========================================================
   MOSTRAR / OCULTAR PASSWORD
========================================================= */

passwordToggle.addEventListener(
    "click",
    () => {

        const isHidden =
            password.type ===
            "password";


        password.type =
            isHidden
                ? "text"
                : "password";


        const icon =
            passwordToggle.querySelector(
                "i"
            );


        icon.className =
            isHidden
                ? "bi bi-eye-slash"
                : "bi bi-eye";


        passwordToggle.setAttribute(
            "aria-label",
            isHidden
                ? "Ocultar contraseña"
                : "Mostrar contraseña"
        );

    }
);


/* =========================================================
   VALIDACIÓN EN TIEMPO REAL
========================================================= */

email.addEventListener(
    "blur",
    validateEmail
);


password.addEventListener(
    "blur",
    validatePassword
);


/* =========================================================
   SUBMIT
========================================================= */

form.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        statusElement.className =
            "form-status";


        const isEmailValid =
            validateEmail();


        const isPasswordValid =
            validatePassword();


        if (
            !isEmailValid
            ||
            !isPasswordValid
        ) {

            statusElement.textContent =
                "Revisa los campos marcados antes de continuar.";

            statusElement.classList.add(
                "error"
            );

            return;

        }


        statusElement.textContent =
            "Credenciales validadas correctamente.";

        statusElement.classList.add(
            "success"
        );

    }
);