import { getProducts } from "./api.js";

const productGrid = document.getElementById("productGrid");
const carouselSlide = document.getElementById("carouselSlide");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

let carouselProducts = [];
let currentSlideIndex = 0;

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

        carouselProducts = products.slice(0, 3);
        displayCarouselProduct();

        const firstTwelveProducts = products.slice(0, 12);

        productGrid.innerHTML = firstTwelveProducts
            .map(createProductCard)
            .join("");
    } catch (error) {
        productGrid.innerHTML = `<p>Something went wrong loading products.</p>`;
        carouselSlide.innerHTML =`<p>Something went wrong loading featured products.</p>`;
        console.error(error);
    }
}

function displayCarouselProduct() {
    if (carouselProducts.length === 0) {
        carouselSlide.innerHTML = "<p>No featured products found.</p>";
        return;
    }

    const product = carouselProducts[currentSlideIndex];

    carouselSlide.innerHTML = `
        <img src="${product.image.url}" alt="${product.image.alt || product.title}">

        <div class="carousel-content">
            <h1>${product.title}</h1>
            <p>${product.discountedPrice} kr</p>
            <a href="/product/index.html?id=${product.id}" class="button">
                View product
            </a>
        </div>
    `;
}

nextButton.addEventListener("click", function() {
    currentSlideIndex++;

    if (currentSlideIndex >= carouselProducts.length) {
        currentSlideIndex = 0;
    }

    displayCarouselProduct();
});

prevButton.addEventListener("click", function() {
    currentSlideIndex--;

    if(currentSlideIndex < 0) {
        currentSlideIndex = carouselProducts.length - 1;
    }

    displayCarouselProduct();
});


displayProducts();