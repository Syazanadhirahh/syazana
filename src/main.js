// Initialize an empty itinerary array
let itinerary = [];

// Function to render the itinerary list
const renderItinerary = () => {
    const itineraryList = document.getElementById('itineraryList');
 itineraryList.innerHTML = ''; // Clear current list

    itinerary.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;

        // Create a remove button for each item
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = () => {
            removeItineraryItem(index);
        };

        li.appendChild(removeBtn);
        itineraryList.appendChild(li);
    });
};

// Function to add an item to the itinerary
const addItineraryItem = (item) => {
    if (item) {
        itinerary.push(item);
        renderItinerary();
    }
};

// Function to remove an item from the itinerary
const removeItineraryItem = (index) => {
    itinerary.splice(index, 1);
    renderItinerary();
};

// Handle itinerary form submission
document.getElementById('itineraryForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const itineraryInput = document.getElementById('itineraryInput');
    const item = itineraryInput.value.trim();

    addItineraryItem(item);
    itineraryInput.value = ''; // Clear the input field

    // Fetch weather data and suggest activities after adding itinerary item
    fetchWeatherAndSuggestActivities(item);
});

// Weather-related functionality
const apiKey = '722c892ccae9ae1d7f6e3c4666ecf1fd'; // Replace with your OpenWeatherMap API key

// Function to fetch weather data and suggest activities
const fetchWeatherAndSuggestActivities = (location) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            const { main, weather } = data;
            const temperature = main.temp;
            const description = weather[0].description;

            // Suggest activities based on weather
            suggestActivities(temperature, description);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weatherResult').innerHTML = '<p>Failed to fetch weather data. Please try again.</p>';
        });
};

// Function to suggest activities based on weather
const suggestActivities = (temperature, description) => {
    let activities = '';

    if (temperature < 0) {
        activities = 'Suggested Activities: Indoor activities like visiting a museum or enjoying a hot drink at a café.';
    } else if (temperature < 10) {
        activities = 'Suggested Activities: Go for a short hike or visit a local indoor market.';
    } else if (temperature < 20) {
        activities = 'Suggested Activities: Perfect for a picnic in the park or exploring outdoor markets.';
    } else {
        activities = 'Suggested Activities: Great time for beach activities or outdoor sports.';
    }

    if (description.includes('rain')) {
        activities += ' Also, consider visiting an indoor attraction or carrying an umbrella.';
    } else if (description.includes('snow')) {
        activities += ' Enjoy some snow activities like skiing or snowboarding!';
    }

    document.getElementById('activitySuggestion').innerHTML = `<p>${activities}</p>`;
    document.getElementById('weatherResult').style.display = 'block'; // Show the weather result box
    document.getElementById('activitySuggestion').style.display = 'block'; // Show the activity suggestion box
};

// Initial render
renderItinerary();