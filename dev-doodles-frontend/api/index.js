const API_ENDPOINT = 'http://localhost:3001';

// async function responseHandler(res, status) {

// }

export async function fetchStickers() {
    const response = await fetch(`${API_ENDPOINT}/stickers`);
    const stickers = await response.json();
    console.log(stickers);
    return stickers;
}

export async function fetchUser() {
    const response = await fetch(`${API_ENDPOINT}/user`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (!response.ok) {
        return null;
    }
    
    const user = await response.json();
    return user;
}

export async function logout() {
    const response = await fetch(`${API_ENDPOINT}/logout`, {
        method: "POST",
        credentials: "include",
    });
    return response;
}