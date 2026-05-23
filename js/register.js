import { registerUser } from "./api.js";

const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");

registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    registerMessage.textContent = "";

    if (password.length < 8) {
        registerMessage.textContent = "Password must be at least 8 characters.";
        return;
    }

    try {
        await registerUser({
            name: name,
            email: email,
            password: password,
        });

        registerMessage.textContent = "Account created. You can now <a href="account/login.html">log in</a>.";
        registerForm.reset();
    } catch (error) {
        registerMessage.textContent = error.message;
    }
});