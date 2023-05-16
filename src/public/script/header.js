// icon when show about sidebar
const aboutBtn = document.querySelector("#AboutSideBar");
const chevronCompactDown = document.querySelector(".bi-chevron-compact-down");
aboutBtn.onclick = () => {
    if (chevronCompactDown.style.transform == "") {
        chevronCompactDown.style.transform = "rotate(-180deg)";
    } else {
        chevronCompactDown.style.transform = "";
    }
};

// show search field top
const resultSearch = document.querySelector("#resultSearch");
const searchField = document.querySelector(".searchField");
const searchBtn = document.querySelector("#searchBtn");
const searchInput = document.querySelector("#searchInput");
searchBtn.addEventListener("click", () => {
    searchField.classList.add("show");
    searchInput.focus();
});

// close search field top
const closeSearchBtn = document.querySelector("#closeSearchBtn");
closeSearchBtn.addEventListener("click", () => {
    resultSearch.innerHTML = "";
    searchField.classList.remove("show");
});

// search bar
const seachBarTop = document.querySelector("#searchInput");
seachBarTop.addEventListener("keyup", () => {
    if (seachBarTop.value.length >= 1) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "/search/bar?q=" + seachBarTop.value);
        xhr.onload = function () {
            if (xhr.status == 200) {
                resultSearch.innerHTML = "";
                const result = JSON.parse(xhr.response).result;
                if (result.length > 0) {
                    result.forEach((product) => {
                        const div = document.createElement("div");
                        div.classList.add(
                            "col-lg-4",
                            "col-sm-6",
                            "d-flex",
                            "justify-content-center",
                            "align-items-center",
                            "mt-4",
                            "mb-4"
                        );
                        div.innerHTML = `
                            <a class="d-flex justify-content-center flex-column" href="/collections/${product._id}">
                                <img src="${product.image}" alt="${product.name}" height="300px">
                                <div class="fs-4 text-center" style="font-weight: 300;">
                                    ${product.name}
                                </div>
                            </a>
                        `;
                        resultSearch.appendChild(div);
                    });
                } else {
                    const div = document.createElement("div");
                    div.classList.add(
                        "col-lg-12",
                        "col-sm-12",
                        "d-flex",
                        "justify-content-center",
                        "align-items-center",
                        "mt-4",
                        "mb-4"
                    );
                    div.innerHTML = `
                            <div class="fs-4" style="font-weight: 300;">
                                No results found for “${seachBarTop.value}”. Check the spelling or use a different word or phrase.
                            </div>
                        `;
                    resultSearch.appendChild(div);
                }
            }
        };
        xhr.send();
    }
});

// check if logged in
const acccountSideBar = document.querySelector("#acccountSideBar");
if (acccountSideBar.ariaValueText) {
    acccountSideBar.innerHTML = `
            <ul class="fs-4" style="font-weight: 300; padding-left: 0">
                <li>
                    <a href="/account">
                        Account
                    </a>
                </li>
                <li>
                    <button type="submit" form="logoutForm">
                        Log out
                    </button>
                </li>
            </ul>
            `;
} else {
    acccountSideBar.innerHTML = `
            <ul class="fs-4" style="font-weight: 300; padding-left: 0">
                <li>
                    <a href="/account/login">
                        Log in
                    </a>
                </li>
                <li>
                    <a href="/account/register">
                        Create account
                    </a>
                </li>
            </ul>
            `;
}

// total price
const totalPrice = document.querySelector(".total-price");
const products = document.querySelectorAll(".cart-side-bar-products .row");
let total = 0;

if (totalPrice !== null) {
    products.forEach((product) => {
        total +=
            Number(product.querySelector(".product-price").innerHTML.slice(1)) *
            Number(product.querySelector("input").value);
    });
    totalPrice.innerHTML = `$${total.toFixed(2)}`;
}

// remove product
function removeProduct(e) {
    const productRow = e.target.parentElement.parentElement.parentElement;
    const id = e.target.id;
    productRow.remove();
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/cart/remove/" + e.target.id);
    xhr.onload = () => {
        const result = JSON.parse(xhr.responseText);
        const totalPrice = document.querySelector(".total-price");
        totalPrice.innerHTML = "$" + result.totalPrice.toFixed(2);
        if (result.totalPrice === 0) {
            const cartSideBarBody = document.querySelector(
                ".cart-side-bar-products"
            );
            cartSideBarBody.innerHTML =
                '<div class="d-flex justify-content-center align-items-center fs-4" style="font-weight: 300;">Your cart is currently empty.</div>';
            const checkOutCartSideBar = document.querySelector(
                ".check-out-cart-side-bar"
            );
            checkOutCartSideBar.remove();
        }
    };
    xhr.send();
}

// update quantity
function updateQuantity(e) {
    if (e.target.value < 1) {
        e.target.value = 1;
    } else {
        const id =
            e.target.parentElement.parentElement.parentElement.getAttribute(
                "value"
            );
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `/cart/update/${id}?quantity=${e.target.value}`);
        xhr.onload = () => {
            const result = JSON.parse(xhr.responseText);
            const totalPrice = document.querySelector(".total-price");
            totalPrice.innerHTML = "$" + result.totalPrice.toFixed(2);
        };
        xhr.send();
    }
}
