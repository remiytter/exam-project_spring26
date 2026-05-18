const headerActions = document.getElementById("headerActions");

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/index.html";
}

function renderHeaderActions() {
    if (!headerActions) {
        return;
    }

    if (token && user) {
        headerActions.innerHTML = `
            <a href="/cart/index.html">Cart</a>

            <span>Hello, ${user.name}</span>

            <button id="logoutButton">
                Logout
            </button>
        `;

        const logoutButton = document.getElementById("logoutButton");

        logoutButton.addEventListener("click", logout);

    } else {
        headerActions.innerHTML = `
            <a href="/cart/index.html">Cart</a>
            <a href="/account/login.html">Login</a>
        `;
    }
}

renderHeaderActions();