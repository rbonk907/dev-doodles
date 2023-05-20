const API_ENDPOINT = 'http://localhost:3001';

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
    const user = await response.json();
    return user;
}