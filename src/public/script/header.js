const chevronCompactDown = document.querySelector(".bi-chevron-compact-down");
const aboutBtn = document.querySelector("#AboutSideBar");
const acccountSideBar = document.querySelector("#acccountSideBar");
const searchField = document.querySelector(".searchField");
const searchBtn = document.querySelector("#searchBtn");
const closeSearchBtn = document.querySelector("#closeSearchBtn");
const searchInput = document.querySelector("#searchInput");

aboutBtn.onclick = () => {
    if (chevronCompactDown.style.transform == "") {
        chevronCompactDown.style.transform = "rotate(-180deg)";
    } else {
        chevronCompactDown.style.transform = "";
    }
};

searchBtn.addEventListener("click", () => {
    searchField.classList.add("show");
    searchInput.focus();
});

closeSearchBtn.addEventListener("click", () => {
    searchField.classList.remove("show");
});
