import { getProductById } from "./api.js";
import { addToCart } from "./storage.js";

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

            <button class="button" id="addToCartButton">
                Add to cart
            </button>

            <button class="share-button" id="shareButton">
                Share product
            </button>
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

        addToCartButton.addEventListener("click", function () {
            addToCart(currentProduct);
            alert("Product added to cart");
    });
    } catch (error) {
        productDetail.innerHTML = "<p>Something went wrong loading the product.</p>";
        console.error(error);
    }
}

displayProduct();