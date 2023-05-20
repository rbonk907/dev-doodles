const API_ENDPOINT = 'http://localhost:3001';

export async function fetchStickers() {
    const response = await fetch(`${API_ENDPOINT}/stickers`);
    const stickers = await response.json();
    console.log(stickers);
    return stickers;
}
