"use strict";

import {
    getProducts,
    saveProducts
} from "./product-storage.js";


const tableBody =
    document.getElementById(
        "products-table-body"
    );


const emptyState =
    document.getElementById(
        "products-empty"
    );


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


function createProductRow(product) {

    const critical =
        product.criticalStock !== null
        &&
        product.criticalStock !== undefined
        &&
        product.stock <=
            product.criticalStock;


    return `
        <tr>

            <td>
                ${product.code}
            </td>


            <td>
                ${product.name}
            </td>


            <td>
                ${product.category}
            </td>


            <td>
                ${formatPrice(product.price)}
            </td>


            <td>

                <span
                    class="
                        ${critical
                            ? "stock-critical"
                            : ""}
                    "
                >
                    ${product.stock}
                </span>

            </td>


            <td>
                ${
                    product.criticalStock
                    ?? "-"
                }
            </td>


            <td>

                ${
                    critical
                        ? `
                            <span class="stock-alert">
                                Stock crítico
                            </span>
                          `
                        : `
                            <span class="role-badge">
                                Disponible
                            </span>
                          `
                }

            </td>


            <td>

                <div class="admin-actions">

                    <a
                        href="product-form.html?id=${product.id}"
                        class="admin-action-button"
                        aria-label="Editar ${product.name}"
                    >
                        <i class="bi bi-pencil"></i>
                    </a>


                    <button
                        type="button"
                        class="
                            admin-action-button
                            delete
                            product-delete
                        "
                        data-product-id="${product.id}"
                        aria-label="Eliminar ${product.name}"
                    >
                        <i class="bi bi-trash"></i>
                    </button>

                </div>

            </td>

        </tr>
    `;

}


function renderProducts() {

    const products =
        getProducts();


    if (products.length === 0) {

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
        products
            .map(createProductRow)
            .join("");

}


function deleteProduct(productId) {

    const products =
        getProducts();


    const updated =
        products.filter(
            product =>
                product.id !== productId
        );


    saveProducts(updated);

    renderProducts();

}


tableBody.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".product-delete"
            );


        if (!button) {
            return;
        }


        const productId =
            Number(
                button.dataset.productId
            );


        const confirmed =
            window.confirm(
                "¿Deseas eliminar este producto?"
            );


        if (confirmed) {

            deleteProduct(
                productId
            );

        }

    }
);


renderProducts();