const API_BASE = "https://v2.api.noroff.dev";

export async function getProducts() {
    const response = await fetch(`${API_BASE}/online-shop`);

    if(!response.ok) {
        throw new Error("Could not fetch products");
    }

    const result = await response.json();

    return result.data;
}