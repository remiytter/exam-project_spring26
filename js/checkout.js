import { getCart, saveCart } from "./storage.js";

const checkoutForm = document.getElementById("checkoutForm");
const checkoutMessage = document.getElementById("checkoutMessage");

checkoutForm.addEventListener("submit", function(event) {
    event.preventDefault();

    checkoutMessage.textContent = "";

    if (!checkoutForm.checkValidity()) {
        checkoutMessage.textContent = "Please fill out all required fields.";
        return;
    }

    const cart = getCart();

    if (cart.length === 0) {
        checkoutMessage.textContent = "Your cart is empty.";
        return;
    }

    saveCart([]);

    window.location.href = "/success/index.html";
});