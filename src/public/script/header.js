const chevronCompactDown = document.querySelector(".bi-chevron-compact-down");
const aboutBtn = document.querySelector("#AboutSideBar");
const acccountSideBar = document.querySelector("#acccountSideBar");
const searchField = document.querySelector(".searchField");
const searchBtn = document.querySelector("#searchBtn");
const closeSearchBtn = document.querySelector("#closeSearchBtn");
const searchInput = document.querySelector("#searchInput");

// icon when show about sidebar
aboutBtn.onclick = () => {
    if (chevronCompactDown.style.transform == "") {
        chevronCompactDown.style.transform = "rotate(-180deg)";
    } else {
        chevronCompactDown.style.transform = "";
    }
};

// show search field top
searchBtn.addEventListener("click", () => {
    searchField.classList.add("show");
    searchInput.focus();
});

// close search field top
closeSearchBtn.addEventListener("click", () => {
    searchField.classList.remove("show");
});

// check if logged in
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
