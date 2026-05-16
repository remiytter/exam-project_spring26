const API_BASE = "https://v2.api.noroff.dev";

export async function getProducts() {
    const response = await fetch(`${API_BASE}/online-shop`);

    if(!response.ok) {
        throw new Error("Could not fetch products");
    }

    const result = await response.json();

    return result.data;
}

export async function getProductById(id) {
    const response = await fetch(`${API_BASE}/online-shop/${id}`);

    if(!response.ok) {
        throw new Error("Could not fetch product");
    }

    const result = await response.json();

    return result.data;
}

export async function registerUser(userData) {
    const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.errors?.[0]?.message || "Could not register user");
    }

    return result.data;
}

export async function loginUser(userData) {
    const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.errors?.[0]?.message || "Could not log in");
    }

    return result.data;
}