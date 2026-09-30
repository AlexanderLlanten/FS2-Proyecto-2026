"use strict";

/* =========================================================
   KYNEX - CARRITO
========================================================= */

import { products } from "../data/products.js";


/* =========================================================
   CONFIGURACIÓN
========================================================= */

const CART_KEY =
    "kynex_cart";

const FREE_SHIPPING_FROM =
    50000;

const STANDARD_SHIPPING =
    3990;


/* =========================================================
   ELEMENTOS DEL DOM
========================================================= */

const cartItemsContainer =
    document.getElementById("cart-items");

const emptyCartContainer =
    document.getElementById("cart-empty");

const clearCartButton =
    document.getElementById("clear-cart");

const summaryItems =
    document.getElementById("summary-items");

const subtotalElement =
    document.getElementById("cart-subtotal");

const shippingElement =
    document.getElementById("cart-shipping");

const totalElement =
    document.getElementById("cart-total");

const shippingMessage =
    document.getElementById("shipping-message");

const checkoutButton =
    document.getElementById("checkout-button");


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


/* =========================================================
   LOCAL STORAGE
========================================================= */

function getCart() {

    const storedCart =
        localStorage.getItem(CART_KEY);

    if (!storedCart) {
        return [];
    }


    try {

        const parsedCart =
            JSON.parse(storedCart);

        return Array.isArray(parsedCart)
            ? parsedCart
            : [];

    } catch (error) {

        console.error(
            "No fue posible leer el carrito.",
            error
        );

        return [];

    }

}


function saveCart(cart) {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

}


/* =========================================================
   OBTENER INFORMACIÓN COMPLETA
========================================================= */

function getDetailedCart() {

    const cart =
        getCart();


    return cart
        .map(
            cartItem => {

                const product =
                    products.find(
                        item =>
                            item.id === cartItem.id
                    );


                if (!product) {
                    return null;
                }


                return {
                    ...product,

                    quantity:
                        Math.min(
                            Math.max(
                                Number(cartItem.quantity) || 1,
                                1
                            ),
                            product.stock
                        )
                };

            }
        )
        .filter(Boolean);

}


/* =========================================================
   CREAR PRODUCTO DEL CARRITO
========================================================= */

function createCartItem(product) {

    const lineTotal =
        product.price
        *
        product.quantity;


    return `
        <article
            class="cart-item"
            data-product-id="${product.id}"
        >

            <!-- Visual -->

            <div class="cart-item-visual">

                <i
                    class="bi ${product.icon}"
                    aria-hidden="true"
                ></i>

            </div>


            <!-- Información -->

            <div class="cart-item-info">

                <span class="cart-item-category">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ${product.format}
                    ·
                    ${product.flavor}
                </p>


                <a
                    href="product-detail.html?id=${product.id}"
                    class="cart-item-detail"
                >
                    Ver detalle
                </a>

            </div>


            <!-- Cantidad -->

            <div class="cart-item-quantity">

                <span>
                    Cantidad
                </span>


                <div class="quantity-control">

                    <button
                        type="button"
                        class="cart-quantity-minus"
                        data-product-id="${product.id}"
                        aria-label="Disminuir cantidad de ${product.name}"
                    >
                        <i class="bi bi-dash"></i>
                    </button>


                    <input
                        type="number"
                        value="${product.quantity}"
                        readonly
                        aria-label="Cantidad de ${product.name}"
                    >


                    <button
                        type="button"
                        class="cart-quantity-plus"
                        data-product-id="${product.id}"
                        aria-label="Aumentar cantidad de ${product.name}"
                    >
                        <i class="bi bi-plus"></i>
                    </button>

                </div>

            </div>


            <!-- Precio -->

            <div class="cart-item-price">

                <span>
                    Total
                </span>

                <strong>
                    ${formatPrice(lineTotal)}
                </strong>

            </div>


            <!-- Eliminar -->

            <button
                type="button"
                class="cart-remove-button"
                data-product-id="${product.id}"
                aria-label="Eliminar ${product.name} del carrito"
            >

                <i class="bi bi-trash"></i>

            </button>

        </article>
    `;

}


/* =========================================================
   RENDER
========================================================= */

function renderCart() {

    const detailedCart =
        getDetailedCart();


    if (detailedCart.length === 0) {

        cartItemsContainer.innerHTML =
            "";

        emptyCartContainer.classList.remove(
            "d-none"
        );

        clearCartButton.classList.add(
            "d-none"
        );

        checkoutButton.disabled =
            true;


        updateSummary([]);

        updateNavbarCounter([]);

        return;

    }


    emptyCartContainer.classList.add(
        "d-none"
    );

    clearCartButton.classList.remove(
        "d-none"
    );

    checkoutButton.disabled =
        false;


    cartItemsContainer.innerHTML =
        detailedCart
            .map(createCartItem)
            .join("");


    updateSummary(detailedCart);

    updateNavbarCounter(detailedCart);

}


/* =========================================================
   RESUMEN
========================================================= */

function updateSummary(cart) {

    const totalItems =
        cart.reduce(
            (total, product) =>
                total + product.quantity,
            0
        );


    const subtotal =
        cart.reduce(
            (total, product) =>
                total
                +
                (
                    product.price
                    *
                    product.quantity
                ),
            0
        );


    let shipping =
        0;


    if (
        subtotal > 0
        &&
        subtotal < FREE_SHIPPING_FROM
    ) {

        shipping =
            STANDARD_SHIPPING;

    }


    const total =
        subtotal + shipping;


    summaryItems.textContent =
        totalItems;


    subtotalElement.textContent =
        formatPrice(subtotal);


    shippingElement.textContent =
        subtotal === 0
            ? formatPrice(0)
            : shipping === 0
                ? "Gratis"
                : formatPrice(shipping);


    totalElement.textContent =
        formatPrice(total);


    updateShippingMessage(
        subtotal
    );

}


/* =========================================================
   MENSAJE DE DESPACHO
========================================================= */

function updateShippingMessage(subtotal) {

    if (subtotal === 0) {

        shippingMessage.textContent =
            "Agrega productos para calcular el despacho.";

        return;

    }


    if (
        subtotal >=
        FREE_SHIPPING_FROM
    ) {

        shippingMessage.textContent =
            "Tu compra obtiene despacho gratuito.";

        return;

    }


    const missingAmount =
        FREE_SHIPPING_FROM
        -
        subtotal;


    shippingMessage.textContent =
        `Te faltan ${formatPrice(missingAmount)} para obtener despacho gratuito.`;

}


/* =========================================================
   AUMENTAR CANTIDAD
========================================================= */

function increaseQuantity(productId) {

    const cart =
        getCart();


    const cartItem =
        cart.find(
            item =>
                item.id === productId
        );


    const product =
        products.find(
            item =>
                item.id === productId
        );


    if (
        !cartItem
        ||
        !product
    ) {
        return;
    }


    if (
        cartItem.quantity
        <
        product.stock
    ) {

        cartItem.quantity +=
            1;

    }


    saveCart(cart);

    renderCart();

}


/* =========================================================
   DISMINUIR CANTIDAD
========================================================= */

function decreaseQuantity(productId) {

    const cart =
        getCart();


    const cartItem =
        cart.find(
            item =>
                item.id === productId
        );


    if (!cartItem) {
        return;
    }


    if (cartItem.quantity > 1) {

        cartItem.quantity -=
            1;

    } else {

        removeProduct(productId);

        return;

    }


    saveCart(cart);

    renderCart();

}


/* =========================================================
   ELIMINAR PRODUCTO
========================================================= */

function removeProduct(productId) {

    const cart =
        getCart();


    const updatedCart =
        cart.filter(
            item =>
                item.id !== productId
        );


    saveCart(updatedCart);

    renderCart();

}


/* =========================================================
   VACIAR CARRITO
========================================================= */

function clearCart() {

    localStorage.removeItem(
        CART_KEY
    );

    renderCart();

}


/* =========================================================
   NAVBAR
========================================================= */

function updateNavbarCounter(cart) {

    const counter =
        document.getElementById(
            "cart-counter"
        );


    if (!counter) {
        return;
    }


    const totalItems =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    counter.textContent =
        totalItems;


    counter.setAttribute(
        "aria-label",
        `${totalItems} productos en el carrito`
    );

}


/* =========================================================
   EVENT DELEGATION
========================================================= */

cartItemsContainer.addEventListener(
    "click",
    event => {

        const minusButton =
            event.target.closest(
                ".cart-quantity-minus"
            );


        const plusButton =
            event.target.closest(
                ".cart-quantity-plus"
            );


        const removeButton =
            event.target.closest(
                ".cart-remove-button"
            );


        if (minusButton) {

            decreaseQuantity(
                Number(
                    minusButton.dataset.productId
                )
            );

            return;

        }


        if (plusButton) {

            increaseQuantity(
                Number(
                    plusButton.dataset.productId
                )
            );

            return;

        }


        if (removeButton) {

            removeProduct(
                Number(
                    removeButton.dataset.productId
                )
            );

        }

    }
);


/* =========================================================
   EVENTOS
========================================================= */

clearCartButton.addEventListener(
    "click",
    clearCart
);


checkoutButton.addEventListener(
    "click",
    () => {

        alert(
            "El proceso de checkout será implementado en una etapa posterior."
        );

    }
);


/* =========================================================
   INICIALIZACIÓN
========================================================= */

renderCart();