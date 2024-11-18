const searchInput = document.getElementById("search-input");
const searchButton = document.querySelector(".search button");
const ApiKey = "ca320f156cfe21e4a2b8623703a1aebc";
const ApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&";
const weatherIcon = document.querySelector(".weather-icon");

// Display weather data
function displayWeather(data) {
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = data.main.temp + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main === "Rain") {
        weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main === "Clouds") {
        weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main === "Clear") {
        weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main === "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
        weatherIcon.src = "images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
}

// Fetch weather by city name
async function CheckWeather(city) {
    try {
        const response = await fetch(`${ApiUrl}q=${city}&appid=${ApiKey}`);
        if (response.ok) {
            const data = await response.json();
            displayWeather(data);
        } else {
            throw new Error("City not found.");
        }
    } catch (error) {
        console.error("Error:", error.message);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

// Fetch weather by latitude and longitude
async function CheckWeatherbyL(lat, lon) {
    try {
        const response = await fetch(`${ApiUrl}lat=${lat}&lon=${lon}&appid=${ApiKey}`);
        if (response.ok) {
            const data = await response.json();
            displayWeather(data);
        } else {
            throw new Error("Location weather not found.");
        }
    } catch (error) {
        console.error("Error:", error.message);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

// Get current location and fetch weather
function fetchCurrentLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                CheckWeatherbyL(lat, lon);
            },
            (error) => {
                console.error("Error fetching location:", error.message);
                document.querySelector(".error").innerHTML = "Unable to fetch location.";
                document.querySelector(".error").style.display = "block";
            }
        );
    } else {
        console.error("Geolocation is not supported by your browser.");
        document.querySelector(".error").innerHTML = "Geolocation not supported.";
        document.querySelector(".error").style.display = "block";
    }
}

// On page load, fetch weather for current location
window.onload = fetchCurrentLocationWeather;

// Event listener for search button
searchButton.addEventListener("click", () => {
    CheckWeather(searchInput.value);
});
