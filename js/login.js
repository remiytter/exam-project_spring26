import { loginUser } from "./api.js";

if (localStorage.getItem("token")) {
    window.location.href = "/index.html";
}

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    loginMessage.textContent = "";

    try {
        const user = await loginUser({
            email: email,
            password: password,
        });

        localStorage.setItem("token", user.accessToken);
        localStorage.setItem("user", JSON.stringify(user));

        loginMessage.textContent = "You are now logged in.";

        window.location.href = "index.html";
    } catch (error) {
        loginMessage.textContent = error.message;
    }
});