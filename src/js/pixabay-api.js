import axios from "axios";

const API_KEY = "49553304-bb2269abcee8455e1256fbbe8";
const BASE_URL = "https://pixabay.com/api/";

export async function fetchImages(query) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
      },
    });

    return response.data.hits; // Масив зображень
  } catch (error) {
    console.error("Помилка при запиті до Pixabay API:", error);
    throw error;
  }
}