"use strict";

/* =========================================================
   KYNEX - RENDERIZADO DEL CATÁLOGO
========================================================= */

import {
    getProducts
} from "./product-storage.js";


/* =========================================================
   DATOS
========================================================= */

let products =
    getProducts();


/* =========================================================
   ELEMENTOS DEL DOM
========================================================= */

const productsContainer =
    document.getElementById(
        "products-container"
    );

const searchInput =
    document.getElementById(
        "product-search"
    );

const categoryFilter =
    document.getElementById(
        "category-filter"
    );

const catalogCount =
    document.getElementById(
        "catalog-count"
    );

const emptyState =
    document.getElementById(
        "catalog-empty"
    );


/* =========================================================
   FORMATEO
========================================================= */

function formatPrice(price) {

    return new Intl.NumberFormat(
        "es-CL",
        {
            style:
                "currency",

            currency:
                "CLP",

            maximumFractionDigits:
                0
        }
    ).format(price);

}


/* =========================================================
   TARJETA
========================================================= */

function createProductCard(product) {

    const goals =
        Array.isArray(product.goals)
            ? product.goals
                .slice(0, 2)
                .map(
                    goal =>
                        `
                            <span class="product-tag">
                                ${goal}
                            </span>
                        `
                )
                .join("")
            : "";


    const description =
        product.description
        ||
        "Producto disponible en KYNEX.";


    const format =
        product.format
        ||
        "Sin especificar";


    const icon =
        product.icon
        ||
        "bi-box-seam";


    return `
        <div class="col-md-6 col-xl-4">

            <article class="shop-product-card">

                <div class="shop-product-visual">

                    <span class="stock-badge">

                        ${
                            product.stock > 0
                                ? "Disponible"
                                : "Sin stock"
                        }

                    </span>


                    <i
                        class="bi ${icon}"
                        aria-hidden="true"
                    ></i>

                </div>


                <div class="shop-product-body">

                    <div class="shop-product-meta">

                        <span>
                            ${product.category}
                        </span>

                        <span>
                            ${format}
                        </span>

                    </div>


                    <h2>
                        ${product.name}
                    </h2>


                    <p>
                        ${description}
                    </p>


                    <div class="product-tags">
                        ${goals}
                    </div>


                    <div class="shop-product-bottom">

                        <div>

                            <small>
                                Precio
                            </small>

                            <strong>
                                ${formatPrice(product.price)}
                            </strong>

                        </div>


                        <a
                            href="product-detail.html?id=${product.id}"
                            class="btn btn-kynex-primary"
                            aria-label="Ver ${product.name}"
                        >
                            Ver producto
                        </a>

                    </div>

                </div>

            </article>

        </div>
    `;

}


/* =========================================================
   RENDER
========================================================= */

function renderProducts(productList) {

    if (!productsContainer) {
        return;
    }


    productsContainer.innerHTML =
        productList
            .map(createProductCard)
            .join("");


    updateCatalogState(
        productList
    );

}


/* =========================================================
   ESTADO CATÁLOGO
========================================================= */

function updateCatalogState(productList) {

    const quantity =
        productList.length;


    if (catalogCount) {

        catalogCount.textContent =
            quantity === 1
                ? "1 producto encontrado"
                : `${quantity} productos encontrados`;

    }


    if (emptyState) {

        emptyState.classList.toggle(
            "d-none",
            quantity !== 0
        );

    }

}


/* =========================================================
   FILTROS
========================================================= */

function applyFilters() {

    products =
        getProducts();


    const searchTerm =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const selectedCategory =
        categoryFilter
            ? categoryFilter.value
            : "all";


    const filteredProducts =
        products.filter(
            product => {

                const name =
                    product.name
                        ?.toLowerCase()
                    || "";


                const description =
                    product.description
                        ?.toLowerCase()
                    || "";


                const category =
                    product.category
                        ?.toLowerCase()
                    || "";


                const matchesSearch =
                    name.includes(
                        searchTerm
                    )
                    ||
                    description.includes(
                        searchTerm
                    )
                    ||
                    category.includes(
                        searchTerm
                    );


                const matchesCategory =
                    selectedCategory ===
                        "all"
                    ||
                    product.category ===
                        selectedCategory;


                return (
                    matchesSearch
                    &&
                    matchesCategory
                );

            }
        );


    renderProducts(
        filteredProducts
    );

}


/* =========================================================
   EVENTOS
========================================================= */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        applyFilters
    );

}


if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        applyFilters
    );

}


/* =========================================================
   INICIALIZACIÓN
========================================================= */

renderProducts(
    products
);