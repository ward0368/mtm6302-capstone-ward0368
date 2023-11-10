// Get references to DOM elements
const apodForm = document.getElementById("apodForm");
const dateInput = document.getElementById("date");
const apodContainer = document.getElementById("apodContainer");
const favoriteButton = document.getElementById("favoriteButton");
const favoritesContainer = document.getElementById("favorites-container");

// Initialize an empty favorites array
let favorites = [];

// Event listener for the APOD form submission
apodForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const selectedDate = dateInput.value;
  
  // Make an API request using the selected date
  const apodData = await fetchAPOD(selectedDate);
  
  // Display the APOD data on the page
  displayAPOD(apodData);
  
  // Update the "Favorite" button
  updateFavoriteButton(apodData);
});

// Event listener for the "Favorite" button click
favoriteButton.addEventListener("click", () => {
  const selectedDate = dateInput.value;
  toggleFavorite(selectedDate);
});

// Function to fetch APOD data from NASA API
function fetchAPOD(date) {
  const apiKey = "Gn2fSluExTEo1TgglbcAkiSDlWQ8X6DgeV7txEh8";
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
  
  return fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => console.error("Error fetching APOD data: ", error));
}

// Function to display APOD data on the page
function displayAPOD(apodData) {
  // Display the APOD image, title, date, and explanation on the page
  const imageElement = document.createElement("img");
  imageElement.src = apodData.url;
  imageElement.alt = apodData.title;
  imageElement.addEventListener("click", () => {
    window.open(apodData.hdurl, "_blank");
  });

  const titleElement = document.createElement("h2");
  titleElement.textContent = apodData.title;

  const dateElement = document.createElement("p");
  dateElement.textContent = apodData.date;

  const explanationElement = document.createElement("p");
  explanationElement.textContent = apodData.explanation;

  apodContainer.innerHTML = "";
  apodContainer.appendChild(imageElement);
  apodContainer.appendChild(titleElement);
  apodContainer.appendChild(dateElement);
  apodContainer.appendChild(explanationElement);
}

// Function to update the "Favorite" button text based on the APOD's favorited status
function updateFavoriteButton(apodData) {
  const isFavorite = favorites.some((favorite) => favorite.date === apodData.date);
  
  if (isFavorite) {
    favoriteButton.textContent = "Unfavorite";
  } else {
    favoriteButton.textContent = "Favorite";
  }
}

// Async function to toggle APOD's favorite status
async function toggleFavorite(date) {
  const isFavorite = favorites.some((favorite) => favorite.date === date);
  
  if (!isFavorite) {
    const apodData = await fetchAPOD(date);
    favorites.push({ date, data: apodData });
  } else {
    favorites = favorites.filter((favorite) => favorite.date !== date);
  }
  
  updateFavoriteButton({ date });
  displayFavorites();
}

// Function to display favorite APODs in the favorites container
function displayFavorites() {
  favoritesContainer.innerHTML = "";
  
  favorites.forEach((favorite) => {
    // Create a container for each favorite APOD
    const favoriteElement = document.createElement("div");
    favoriteElement.className = "favorite-item";

    const favoriteDate = document.createElement("p");
    favoriteDate.textContent = favorite.date;

    const viewButton = document.createElement("button");
    viewButton.textContent = "View";
    viewButton.addEventListener("click", () => {
      displayAPOD(favorite.data);
    });

    favoriteElement.appendChild(favoriteDate);
    favoriteElement.appendChild(viewButton);
    favoritesContainer.appendChild(favoriteElement);
  });
}