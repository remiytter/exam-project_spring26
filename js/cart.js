import { getCart, saveCart} from "./storage.js";

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const clearCartButton = document.getElementById("clearCartButton");
const checkoutButton = document.getElementById("checkoutButton");

function displayCart() {
    const cart = getCart();

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.textContent = "0 kr";
        checkoutButton.classList.add("disabled");
        checkoutButton.textContent = "Cart is empty";
        clearCartButton.style.display = "none";
        return;
    }

    checkoutButton.classList.remove("disabled");

    cartItems.innerHTML = cart.map((item) => {
        return `
            <div class="cart-item">
                <img src="${item.image.url}" alt="${item.image.alt || item.title}">

                <div>
                    <h2>${item.title}</h2>
                    <p>${item.price} kr</p>
                    <p>Quantity: ${item.quantity}</p>

                    <button class="decrease-button" data-id="${item.id}">-</button>
                    <button class="increase-button" data-id="${item.id}">+</button>
                    <button class="remove-button" data-id="${item.id}">Remove</button>
                </div>
            </div>
        `;
    })
    .join("");

    const total = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    cartTotal.textContent = `${total} kr`;

    setupCartButtons();
}

function setupCartButtons() {
  const increaseButtons = document.querySelectorAll(".increase-button");
  const decreaseButtons = document.querySelectorAll(".decrease-button");
  const removeButtons = document.querySelectorAll(".remove-button");

  increaseButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = button.dataset.id;
      const cart = getCart();

      const product = cart.find((item) => item.id === productId);

      if (!product) {
        return;
      }

      product.quantity++;

      saveCart(cart);
      displayCart();
    });
  });

  decreaseButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = button.dataset.id;
      const cart = getCart();

      const product = cart.find((item) => item.id === productId);

      if (!product) {
        return;
      }

      if (product.quantity > 1) {
        product.quantity--;
        saveCart(cart);
      } else {
        const updatedCart = cart.filter((item) => item.id !== productId);
        saveCart(updatedCart);
      }

      displayCart();
    });
  });

  removeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = button.dataset.id;
      const cart = getCart();

      const updatedCart = cart.filter((item) => item.id !== productId);

      saveCart(updatedCart);
      displayCart();
    });
  });
}

clearCartButton.addEventListener("click", function () {
    saveCart([]);
    displayCart();
});

displayCart();