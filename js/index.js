import { getProducts } from "./api.js";

const productGrid = document.getElementById("productGrid");

function createProductCard(product) {
    const hasDiscount = product.price !== product.discountedPrice;
    
    return `
      <a href="/product/index.html?id=${product.id}" class="product-card">
      <img src="${product.image.url}" alt="${product.image.alt || product.title}">
      
      <div class="product-card-content">
      <h3>${product.title}</h3>
      
      <div class="product-price">
        ${
            hasDiscount
            ? `<span class="old-price">${product.price} kr</span>`
            : ""
        }
        <span>${product.discountedPrice} kr</span>
    </div>
    </div>
    </a>
    `;
}

async function displayProducts() {
    try {
        const products = await getProducts();
        const firstTwelveProducts = products.slice(0, 12);

        productGrid.innerHTML = firstTwelveProducts
            .map(createProductCard)
            .join("");
    } catch (error) {
        productGrid.innerHTML = `<p>Something went wrong loading products.</p>`;
    }
}

displayProducts();