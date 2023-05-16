const addToCartBtn = document.querySelector(".add-to-cart");
const showCartSideBar = document.querySelector("[href='#cartSideBar']");
const cartSideBarProducts = document.querySelector(".cart-side-bar-products");
const cartSideBarBody = document.querySelector(".cartSideBarBody");
const thisDocument = document;

// when click to add to cart
addToCartBtn.addEventListener("click", () => {
    showCartSideBar.click();
    //If cart is empty
    if (cartSideBarProducts.innerText == "Your cart is currently empty.") {
        cartSideBarProducts.innerHTML = "";
        const div = document.createElement("div");
        div.classList.add(
            "check-out-cart-side-bar",
            "d-flex",
            "flex-column",
            "justify-content-end",
            "align-items-center"
        );
        div.style.height = "180px";
        div.style.width = "100%";
        div.innerHTML = `<div class="mb-4 row" style="width: 90%;">
                                <h4 class="col">Subtotal</h4>
                                <h4 class="col total-price text-end">$0</h4>
                            </div>
                            <a href="/cart/checkout" class="accountBtn" style="width: 90%;">Check Out</a>`;
        cartSideBarBody.appendChild(div);
    }
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/cart/add/" + addToCartBtn.value);
    xhr.onload = function () {
        if (xhr.status === 200) {
            let result = JSON.parse(xhr.responseText);
            // if product not exits in cart
            if (!result.exits) {
                const div = document.createElement("div");
                div.classList.add("row");
                div.style.width = "95%";
                div.setAttribute("value", result.product._id);
                let price = Number(result.product.price).toFixed(2);
                div.innerHTML = `<div class="col-4">
                                            <img src="${result.product.image}" alt="productImg" style="width:100%; max-height: 200px; object-fit: contain;">
                                        </div>
                                        <div class="col-8 d-flex flex-column justify-content-start mt-2">
                                            <div class="d-flex justify-content-between mb-2">
                                                <div class="fs-4" style="font-weight: 300;">${result.product.name}</div>
                                                <div class="fs-4 product-price" style="font-weight: 300;">$${price}</div>
                                            </div>
                                            <div class="d-flex justify-content-between mb-2">
                                                <input onchange="updateQuantity(event)" name="quantity" type="number" value="${result.product.quantity}">
                                            </div>
                                            <div class="d-flex justify-content-between mb-2">
                                                <a onclick="removeProduct(event)" class="remove-button" type="button" style="font-weight: 400;" id="${result.product._id}">Remove</a>
                                            </div>
                                        </div>`;
                cartSideBarProducts.appendChild(div);
            } else {
                document.querySelector(
                    `[value='${result.product._id}'] input`
                ).value = result.product.quantity;
            }
            // update total price
            let totalPrice = document.querySelector(".total-price");
            totalPrice.innerHTML = "$" + result.totalPrice.toFixed(2);
        } else {
            console.log("error");
        }
    };
    xhr.send();
});
