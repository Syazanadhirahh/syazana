const apiKey = '722c892ccae9ae1d7f6e3c4666ecf1fd'; // Replace with your OpenWeatherMap API key
const weatherForm = document.getElementById('weatherForm');
const weatherResult = document.getElementById('weatherResult');
const clothingRecommendation = document.getElementById('clothingRecommendation');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const locationInput = document.getElementById('locationInput').value.trim();

    // Validate input
    if (!locationInput) {
        weatherResult.innerHTML = '<p>Please enter a valid city name.</p>';
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&appid=${apiKey}`;

    weatherResult.innerHTML = '<p>Loading...</p>'; // Show loading message

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            const { name, main, weather } = data;
            const temperature = main.temp;
            const feelsLike = main.feels_like;
            const description = weather[0].description;

            weatherResult.innerHTML = `
                <h2>${name}</h2>
                <p>Temperature: ${temperature}°C</p>
                <p>Feels Like: ${feelsLike}°C</p>
                <p>Weather: ${description}</p>
            `;

            // Call the function to get clothing recommendations
            getClothingRecommendation(temperature, description);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherResult.innerHTML = '<p>Failed to fetch weather data. Please try again.</p>';
        });
});

function getClothingRecommendation(temperature, description) {
    let recommendation = '';

    if (temperature < 0) {
        recommendation = 'Wear a heavy winter coat, gloves, and a hat.';
    } else if (temperature < 10) {
        recommendation = 'Wear a warm jacket and a scarf.';
    } else if (temperature < 20) {
        recommendation = 'A light jacket or sweater should be fine.';
    } else {
        recommendation = 'T-shirt and shorts are suitable.';
    }

    clothingRecommendation.innerHTML = `<p>Clothing Recommendation: ${recommendation}</p>`;
}