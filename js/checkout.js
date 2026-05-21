import { saveCart } from "./storage.js";

const checkoutForm = document.getElementById("checkoutForm");
const checkoutMessage = document.getElementById("checkoutMessage");

checkoutForm.addEventListener("submit", function(event) {
    event.preventDefault();

    checkoutMessage.textContent = "";

    if (!checkoutForm.checkValidity()) {
        checkoutMessage.textContent = "Please fill out all required fields.";
        return;
    }

    saveCart([]);

    window.location.href = "/success/index.html";
});