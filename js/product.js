import { getProductById } from "./api.js";
import { addToCart } from "./storage.js";

const token = localStorage.getItem("token");

let currentProduct = null;

const productDetail = document.getElementById("productDetail");

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

function createProductDetail(product) {
    const hasDiscount = product.price !== product.discountedPrice;

    return `
        <div class="product-image-wrapper">
            <img src="${product.image.url}" alt="${product.image.alt || product.title}">
        </div>

        <div class="product-info">
            <p class="product-tags">${product.tags.join(", ")}</p>
            <h1>${product.title}</h1>
            <p>${product.description}</p>

            <div class="product-price">
                ${hasDiscount?`<span class="old-price">${product.price} kr</span>`: ""}
            
                <span>${product.discountedPrice} kr</span>
            </div>

            <p>Rating: ${product.rating}</p>

            <div class="product-reviews">
                <h2>Reviews</h2>

                ${
                    product.reviews.length > 0
                        ? product.reviews.map((review) => {
                            return `
                                <div class="review">
                                    <p>${review.description}</p>
                                    <p>Rating: ${review.rating}</p>
                                    <p>By: ${review.username}</p>
                                </div>
                            `;
                        }).join("")
                        : "<p>No reviews yet.</p>"
                }
            </div>
            ${
                token?`
                    <button class="button" id="addToCartButton">
                        Add to cart
                    </button>`
                    :`<p>Please <a href="/account/login.html">log in</a> to your account to add items to cart.</p>`
            }

            <button class="share-button" id="shareButton" aria-label="Share product">
                🔗 Share
            </button>

            <p id="shareMessage" class="share-message" role="status"></p>
        </div>
        `;
}

async function displayProduct() {
    if(!productId) {
        productDetail.innerHTML = "<p>No product found.</p>";
        return;
    }

    try {
        const product = await getProductById(productId);
        currentProduct = product;
        productDetail.innerHTML = createProductDetail(product);

        const addToCartButton = document.getElementById("addToCartButton");

        if (addToCartButton) {
            addToCartButton.addEventListener("click", function() {
                addToCart(currentProduct);
                
                const cartMessage = document.getElementById("cartMessage");

                cartMessage.textContent = "Product added to cart.";

                setTimeout(function () {
                    cartMessage.textContent = "";
                }, 2000);
            });
        }

        const shareButton = document.getElementById("shareButton");
        const shareMessage = document.getElementById("shareMessage");

        shareButton.addEventListener("click", async function () {
            try {
                await navigator.clipboard.writeText(window.location.href);

                shareMessage.textContent = "Link copied to clipboard";

                setTimeout(function () {
                    shareMessage.textContent = "";
                }, 2000);
            } catch (error) {
                shareMessage.textContent = "Could not copy link.";
            }
        });

    } catch (error) {
        productDetail.innerHTML = "<p>Something went wrong loading the product.</p>";
        console.error(error);
    }
}

displayProduct();