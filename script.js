/* ================= CART ================= */

function getCart() {
    return JSON.parse(
        localStorage.getItem("noteNestCart") || "[]"
    );
}


function addToCart(productName, price) {

    let cart = getCart();

    const existingProduct = cart.find(
        item => item.name === productName
    );

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: Number(price),
            quantity: 1
        });
    }

    localStorage.setItem(
        "noteNestCart",
        JSON.stringify(cart)
    );

    alert(productName + " added to cart! 🛒");
}


/* ================= REMOVE PRODUCT ================= */

function removeFromCart(index) {

    let cart = getCart();

    cart.splice(index, 1);

    localStorage.setItem(
        "noteNestCart",
        JSON.stringify(cart)
    );

    renderCart();
}


/* ================= DECREASE QUANTITY ================= */

function decreaseQuantity(index) {

    let cart = getCart();

    if (cart[index].quantity > 1) {

        cart[index].quantity -= 1;

    } else {

        cart.splice(index, 1);

    }

    localStorage.setItem(
        "noteNestCart",
        JSON.stringify(cart)
    );

    renderCart();
}


/* ================= INCREASE QUANTITY ================= */

function increaseQuantity(index) {

    let cart = getCart();

    cart[index].quantity += 1;

    localStorage.setItem(
        "noteNestCart",
        JSON.stringify(cart)
    );

    renderCart();
}


/* ================= CLEAR CART ================= */

function clearCart() {

    localStorage.removeItem("noteNestCart");

    renderCart();
}


/* ================= CATEGORY FILTER ================= */

function filterProducts(category) {

    const products =
        document.querySelectorAll(
            "#products .product-card"
        );

    products.forEach(function(product) {

        const text =
            product.innerText.toLowerCase();

        if (text.includes(category)) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });

    const productsSection =
        document.getElementById("products");

    if (productsSection) {

        productsSection.scrollIntoView({
            behavior: "smooth"
        });

    }
}


/* ================= SHOW ALL PRODUCTS ================= */

function showAllProducts() {

    const products =
        document.querySelectorAll(
            "#products .product-card"
        );

    products.forEach(function(product) {

        product.style.display = "";

    });

    const productsSection =
        document.getElementById("products");

    if (productsSection) {

        productsSection.scrollIntoView({
            behavior: "smooth"
        });

    }
}


/* ================= SEARCH PRODUCTS ================= */

function searchProducts() {

    const searchInput =
        document.getElementById(
            "productSearch"
        );

    if (!searchInput) {
        return;
    }

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();

    const products =
        document.querySelectorAll(
            "#products .product-card"
        );

    products.forEach(function(product) {

        const productText =
            product.innerText.toLowerCase();

        if (
            productText.includes(searchText)
        ) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });
}


/* ================= RENDER CART ================= */

function renderCart() {

    const cartItems =
        document.getElementById(
            "cartItems"
        );

    if (!cartItems) {
        return;
    }

    let cart = getCart();


    /* EMPTY CART */

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <h2>
                    Your cart is empty
                </h2>

                <p>
                    Add a product to get started.
                </p>

                <br>

                <a
                    href="index.html#products"
                    class="shop-btn">

                    Browse Products

                </a>

            </div>

        `;

        const checkoutArea =
            document.getElementById(
                "checkoutArea"
            );

        if (checkoutArea) {

            checkoutArea.style.display =
                "none";

        }

        return;
    }


    /* CART PRODUCTS */

    let total = 0;

    cartItems.innerHTML =
        cart.map(function(item, index) {

            const quantity =
                item.quantity || 1;

            const itemTotal =
                Number(item.price) * quantity;

            total += itemTotal;


            return `

                <div class="cart-item">

                    <div>

                        <h3>
                            ${item.name}
                        </h3>

                        <p>
                            ₹${item.price} each
                        </p>

                    </div>


                    <div>

                        <button
                            onclick="decreaseQuantity(${index})">

                            −

                        </button>


                        <strong>
                            ${quantity}
                        </strong>


                        <button
                            onclick="increaseQuantity(${index})">

                            +

                        </button>


                        <span class="cart-price">

                            ₹${itemTotal}

                        </span>


                        <button
                            onclick="removeFromCart(${index})">

                            Remove

                        </button>

                    </div>

                </div>

            `;

        }).join("");


    /* CHECKOUT AREA */

    const checkoutArea =
        document.getElementById(
            "checkoutArea"
        );

    const cartTotal =
        document.getElementById(
            "cartTotal"
        );


    if (
        checkoutArea &&
        cartTotal
    ) {

        checkoutArea.style.display =
            "block";

        cartTotal.innerHTML =
            "Total: ₹" + total;

    }


    /* CLEAR CART BUTTON */

    cartItems.innerHTML += `

        <div style="margin-top:20px;">

            <button
                class="shop-btn"
                onclick="clearCart()">

                Clear Cart

            </button>

        </div>

    `;
}


/* ================= PAGE LOAD ================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderCart();

    }
);