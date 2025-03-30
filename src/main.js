import { fetchImages } from "./js/pixabay-api";
import { renderImages, clearGallery, showLoader, hideLoader } from "./js/render-functions";

const form = document.querySelector(".form");
const searchInput = form.querySelector("input");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  
  const query = searchInput.value.trim();
  if (!query) {
    iziToast.warning({
      title: "Warning",
      message: "Please enter a search term!",
    });
    return;
  }

  clearGallery();
  showLoader();

  try {
    const images = await fetchImages(query);
    renderImages(images);
  } catch (error) {
    iziToast.error({
      title: "Error",
      message: "Something went wrong! Please try again later.",
    });
  } finally {
    hideLoader();
  }
});