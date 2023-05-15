const productName = document.querySelectorAll("#productName");
const productDescription = document.querySelectorAll("#productDescription");
const deleteModal = document.getElementById("deleteProductModal");
const deleteBtn = document.getElementById("deleteBtnModal");
const deleteForm = document.getElementById("deleteForm");
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

// get id for delete modal
let id;
if (deleteModal) {
    deleteModal.addEventListener("show.bs.modal", (event) => {
        const button = event.relatedTarget;
        id = button.getAttribute("data-id");
    });
}

// delete modal button
deleteBtn.addEventListener("click", () => {
    deleteForm.action = `/products/${id}?_method=DELETE`;
    deleteForm.submit();
});

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
