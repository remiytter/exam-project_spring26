const headerActions = document.getElementById("headerActions");

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));
const BASE_PATH = "/exam-project-1"

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = `${BASE_PATH}/index.html`;
}

function renderHeaderActions() {
    if (!headerActions) {
        return;
    }

    if (token && user) {
        headerActions.innerHTML = `
            <a href="${BASE_PATH}/cart/index.html">Cart</a>

            <span class="user-greeting">
                Hello, ${user.name}
            </span>

            <button id="logoutButton">
                Logout
            </button>
        `;

        const logoutButton = document.getElementById("logoutButton");
        logoutButton.addEventListener("click", logout);

    } else {
        headerActions.innerHTML = `
            <a href="${BASE_PATH}/cart/index.html">Cart</a>

            <a href="${BASE_PATH}/account/login.html">
                Login
            </a>
        `;
    }
}

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
        mobileMenu.classList.toggle("open");
    });
}

renderHeaderActions();