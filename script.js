// Get references to the HTML elements
const apodForm = document.getElementById("apodForm");
const dateInput = document.getElementById("date");
const apodContainer = document.getElementById("apodContainer");

// Add a submit event listener to the form
apodForm.addEventListener("submit", async (e) => {
  // Prevent the default form submission behavior
  e.preventDefault();
  
  // Get the selected date from the input field
  const selectedDate = dateInput.value;

  // Make an API request using the selected date
  const apodData = await fetchAPOD(selectedDate);

  // Display the APOD data on the page
  displayAPOD(apodData);
});

// Function to fetch APOD data from the NASA API
function fetchAPOD(date) {
  // API key for NASA APOD API
  const apiKey = "kVurqIjU2JvUbSWYAuTBXVKpX3A4cUorsvOpx5ps";
  
  // Construct the API URL with the provided date and API key
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
  
  // Perform the API request using the fetch function
  return fetch(apiUrl)
    .then((response) => {
      // Check if the response is successful; otherwise, throw an error
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Parse the JSON response and return the result
      return response.json();
    })
    .catch((error) => console.error("Error fetching APOD data: ", error));
}

// Function to display APOD data on the page
function displayAPOD(apodData) {
  // Create an image element for the APOD image
  const imageElement = document.createElement("img");
  // Set the image source and alt text
  imageElement.src = apodData.url;
  imageElement.alt = apodData.title;
  // Add a click event listener to open the high-definition image in a new tab
  imageElement.addEventListener("click", () => {
    window.open(apodData.hdurl, "_blank");
  });

  // Create an h2 element for the APOD title
  const titleElement = document.createElement("h2");
  // Set the text content of the title element
  titleElement.textContent = apodData.title;

  // Create a paragraph element for the APOD date
  const dateElement = document.createElement("p");
  // Set the text content of the date element
  dateElement.textContent = apodData.date;

  // Create a paragraph element for the APOD explanation
  const explanationElement = document.createElement("p");
  // Set the text content of the explanation element
  explanationElement.textContent = apodData.explanation;

  // Clear the existing content of the apodContainer
  apodContainer.innerHTML = "";
  // Append the image, title, date, and explanation elements to the apodContainer
  apodContainer.appendChild(imageElement);
  apodContainer.appendChild(titleElement);
  apodContainer.appendChild(dateElement);
  apodContainer.appendChild(explanationElement);
}
