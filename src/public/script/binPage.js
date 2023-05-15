const productName = document.querySelectorAll("#productName");
const productDescription = document.querySelectorAll("#productDescription");
const searchFieldAdminPanel = document.querySelector(".searchFieldAdminPanel");
const productsRow = document.querySelectorAll(".productsRow");

// text handler
function textHandler(element, textLimit) {
    let text = element.ariaValueText;
    let textLength = text.length;
    if (textLength > textLimit) {
        text = text.slice(0, textLimit) + "...";
    }
    element.innerHTML = text;
}

productName.forEach((e) => textHandler(e, 100));
productDescription.forEach((e) => textHandler(e, 200));

// search field
searchFieldAdminPanel.onkeyup = (e) => {
    productsRow.forEach((product) => {
        if (
            product.cells[2].children[0]
                .getAttribute("aria-valuetext")
                .toLowerCase()
                .includes(searchFieldAdminPanel.value.toLowerCase()) ||
            product.cells[3].children[0]
                .getAttribute("aria-valuetext")
                .toLowerCase()
                .includes(searchFieldAdminPanel.value.toLowerCase())
        ) {
            product.style.display = "table-row";
        } else {
            product.style.display = "none";
        }
    });
    searchFieldAdminPanel.value;
};
