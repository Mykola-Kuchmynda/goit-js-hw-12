import axios from "axios";

const API_KEY = "49553304-bb2269abcee8455e1256fbbe8";
const BASE_URL = "https://pixabay.com/api/";

export async function getImagesByQuery(query, page) {
    const params = {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15,
        page,
    };

    const response = await axios.get(BASE_URL, { params });
    return response.data;
}