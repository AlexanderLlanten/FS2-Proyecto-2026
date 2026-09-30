"use strict";

/* =========================================================
   KYNEX - DETALLE DE PRODUCTO
========================================================= */

import { products } from "../data/products.js";


/* =========================================================
   OBTENER PRODUCTO DESDE URL
========================================================= */

const params =
    new URLSearchParams(window.location.search);

const productId =
    Number(params.get("id"));

const product =
    products.find(
        item => item.id === productId
    );


/* =========================================================
   REFERENCIAS DEL DOM
========================================================= */

const detailContainer =
    document.getElementById("product-detail-container");

const informationContainer =
    document.getElementById("product-information");

const notFoundContainer =
    document.getElementById("product-not-found");

const breadcrumbProduct =
    document.getElementById("breadcrumb-product");


/* =========================================================
   UTILIDADES
========================================================= */

function formatPrice(price) {

    return new Intl.NumberFormat(
        "es-CL",
        {
            style: "currency",
            currency: "CLP",
            maximumFractionDigits: 0
        }
    ).format(price);

}


function createList(items) {

    return items
        .map(
            item => `<li>${item}</li>`
        )
        .join("");

}


/* =========================================================
   PRODUCTO NO ENCONTRADO
========================================================= */

function showProductNotFound() {

    detailContainer?.classList.add("d-none");

    informationContainer?.classList.add("d-none");

    document
        .querySelector(".nutrition-section")
        ?.classList.add("d-none");

    document
        .querySelector(".product-safety")
        ?.classList.add("d-none");

    notFoundContainer
        ?.classList.remove("d-none");

}


/* =========================================================
   RENDER PRINCIPAL
========================================================= */

function renderProduct(product) {

    document.title =
        `${product.name} | KYNEX`;


    breadcrumbProduct.textContent =
        product.name;


    document.getElementById(
        "product-category"
    ).textContent =
        product.category;


    document.getElementById(
        "product-brand"
    ).textContent =
        product.brand;


    document.getElementById(
        "product-name"
    ).textContent =
        product.name;


    document.getElementById(
        "product-description"
    ).textContent =
        product.description;


    document.getElementById(
        "product-price"
    ).textContent =
        formatPrice(product.price);


    document.getElementById(
        "product-format"
    ).textContent =
        product.format;


    document.getElementById(
        "product-flavor"
    ).textContent =
        product.flavor;


    document.getElementById(
        "product-stock"
    ).textContent =
        `${product.stock} unidades disponibles`;


    /* ICONO */

    const icon =
        document.getElementById("product-icon");

    icon.className =
        `bi ${product.icon}`;


    /* STOCK */

    const stockBadge =
        document.getElementById(
            "product-stock-badge"
        );


    if (product.stock > 0) {

        stockBadge.textContent =
            "Disponible";

    } else {

        stockBadge.textContent =
            "Sin stock";

        document.getElementById(
            "add-to-cart"
        ).disabled =
            true;

    }


    /* OBJETIVOS */

    document.getElementById(
        "product-tags"
    ).innerHTML =
        product.goals
            .map(
                goal =>
                    `<span class="product-tag">${goal}</span>`
            )
            .join("");


    /* BENEFICIOS */

    document.getElementById(
        "product-benefits"
    ).innerHTML =
        createList(
            product.benefits
        );


    /* INGREDIENTES */

    document.getElementById(
        "product-ingredients"
    ).innerHTML =
        createList(
            product.ingredients
        );


    /* ALÉRGENOS */

    const allergens =
        document.getElementById(
            "product-allergens"
        );


    if (product.allergens.length === 0) {

        allergens.innerHTML =
            `
                <p class="allergen-safe">
                    No se informan alérgenos
                    en los datos demostrativos.
                </p>
            `;

    } else {

        allergens.innerHTML =
            `
                <ul>
                    ${createList(product.allergens)}
                </ul>
            `;

    }


    /* USO */

    document.getElementById(
        "product-serving"
    ).textContent =
        product.usage.serving;


    document.getElementById(
        "product-preparation"
    ).textContent =
        product.usage.preparation;


    document.getElementById(
        "product-moment"
    ).textContent =
        product.usage.moment;


    /* NUTRICIÓN */

    document.getElementById(
        "nutrition-serving"
    ).textContent =
        product.nutrition.servingSize;


    document.getElementById(
        "nutrition-calories"
    ).textContent =
        `${product.nutrition.calories} kcal`;


    document.getElementById(
        "nutrition-protein"
    ).textContent =
        product.nutrition.protein;


    document.getElementById(
        "nutrition-carbohydrates"
    ).textContent =
        product.nutrition.carbohydrates;


    document.getElementById(
        "nutrition-fats"
    ).textContent =
        product.nutrition.fats;


    /* CERTIFICACIONES */

    document.getElementById(
        "product-certifications"
    ).innerHTML =
        product.certifications
            .map(
                certification =>
                    `
                        <span class="certification-badge">
                            <i class="bi bi-patch-check"></i>

                            ${certification}
                        </span>
                    `
            )
            .join("");


    /* ADVERTENCIA */

    document.getElementById(
        "product-warning"
    ).textContent =
        product.warning;

}


/* =========================================================
   CANTIDAD
========================================================= */

function initializeQuantity() {

    const input =
        document.getElementById(
            "product-quantity"
        );

    const minus =
        document.getElementById(
            "quantity-minus"
        );

    const plus =
        document.getElementById(
            "quantity-plus"
        );


    minus.addEventListener(
        "click",
        () => {

            const value =
                Number(input.value);

            if (value > 1) {

                input.value =
                    value - 1;

            }

        }
    );


    plus.addEventListener(
        "click",
        () => {

            const value =
                Number(input.value);

            const maximum =
                Math.min(
                    product.stock,
                    10
                );


            if (value < maximum) {

                input.value =
                    value + 1;

            }

        }
    );

}


/* =========================================================
   CARRITO
========================================================= */

function addProductToCart() {

    const quantity =
        Number(
            document.getElementById(
                "product-quantity"
            ).value
        );


    const storedCart =
        JSON.parse(
            localStorage.getItem(
                "kynex_cart"
            )
            || "[]"
        );


    const existingProduct =
        storedCart.find(
            item =>
                item.id === product.id
        );


    if (existingProduct) {

        existingProduct.quantity +=
            quantity;

    } else {

        storedCart.push(
            {
                id:
                    product.id,

                name:
                    product.name,

                price:
                    product.price,

                quantity:
                    quantity
            }
        );

    }


    localStorage.setItem(
        "kynex_cart",
        JSON.stringify(
            storedCart
        )
    );


    showCartFeedback(quantity);


    updateNavbarCartCounter();

}


/* =========================================================
   FEEDBACK
========================================================= */

function showCartFeedback(quantity) {

    const feedback =
        document.getElementById(
            "cart-feedback"
        );


    feedback.textContent =
        quantity === 1
            ? "Producto agregado al carrito."
            : `${quantity} productos agregados al carrito.`;

}


/* =========================================================
   CONTADOR DEL NAVBAR
========================================================= */

function updateNavbarCartCounter() {

    const counter =
        document.getElementById(
            "cart-counter"
        );


    const cart =
        JSON.parse(
            localStorage.getItem(
                "kynex_cart"
            )
            || "[]"
        );


    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );


    counter.textContent =
        total;


    counter.setAttribute(
        "aria-label",
        `${total} productos en el carrito`
    );

}


/* =========================================================
   INICIALIZACIÓN
========================================================= */

if (!product) {

    showProductNotFound();

} else {

    renderProduct(product);

    initializeQuantity();


    document.getElementById(
        "add-to-cart"
    ).addEventListener(
        "click",
        addProductToCart
    );

}