"use strict";

/* =========================================================
   KYNEX - UTILIDADES DE VALIDACIÓN
========================================================= */


/* ---------------------------------------------------------
   EMAIL
--------------------------------------------------------- */

const allowedEmailDomains = [
    "duoc.cl",
    "profesor.duoc.cl",
    "gmail.com"
];


export function isAllowedEmail(
    email
) {

    const normalized =
        email
            .trim()
            .toLowerCase();


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (
        !emailPattern.test(
            normalized
        )
    ) {

        return false;

    }


    const domain =
        normalized.split("@")[1];


    return allowedEmailDomains.includes(
        domain
    );

}


/* ---------------------------------------------------------
   RUN CHILENO
--------------------------------------------------------- */

export function cleanRun(run) {

    return run
        .replace(/\./g, "")
        .replace(/-/g, "")
        .trim()
        .toUpperCase();

}


export function isValidRun(run) {

    const cleaned =
        cleanRun(run);


    if (
        cleaned.length < 7
        ||
        cleaned.length > 9
    ) {

        return false;

    }


    const body =
        cleaned.slice(0, -1);

    const verifier =
        cleaned.slice(-1);


    if (!/^\d+$/.test(body)) {

        return false;

    }


    let sum =
        0;

    let multiplier =
        2;


    for (
        let index =
            body.length - 1;

        index >= 0;

        index--
    ) {

        sum +=
            Number(body[index])
            *
            multiplier;


        multiplier =
            multiplier === 7
                ? 2
                : multiplier + 1;

    }


    const result =
        11 - (sum % 11);


    let expectedVerifier;


    if (result === 11) {

        expectedVerifier =
            "0";

    } else if (result === 10) {

        expectedVerifier =
            "K";

    } else {

        expectedVerifier =
            String(result);

    }


    return verifier ===
        expectedVerifier;

}


/* ---------------------------------------------------------
   ESTADO VISUAL
--------------------------------------------------------- */

export function showFieldError(
    input,
    messageElement,
    message
) {

    input.classList.remove(
        "is-valid"
    );

    input.classList.add(
        "is-invalid"
    );


    messageElement.textContent =
        message;

    messageElement.classList.remove(
        "success"
    );

    messageElement.classList.add(
        "error"
    );

}


export function showFieldSuccess(
    input,
    messageElement,
    message = ""
) {

    input.classList.remove(
        "is-invalid"
    );

    input.classList.add(
        "is-valid"
    );


    messageElement.textContent =
        message;

    messageElement.classList.remove(
        "error"
    );


    if (message) {

        messageElement.classList.add(
            "success"
        );

    } else {

        messageElement.classList.remove(
            "success"
        );

    }

}