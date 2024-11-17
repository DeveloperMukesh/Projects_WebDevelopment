const searchInput = document.getElementById("search-input")
const searchButton = document.querySelector(".search button")
const ApiKey = "ca320f156cfe21e4a2b8623703a1aebc"
const ApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
const weatherIcon = document.querySelector(".weather-icon")
async function CheckWeather(city) {
    const response = await fetch(ApiUrl + city + `&appid=${ApiKey}`)
    if (response.ok) {


        var data = await response.json()
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = data.main.temp + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        }
        else if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        }
        document.querySelector(".weather").style.display = "block"
    }
    else {
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    }

}

searchButton.addEventListener("click", () => {
    CheckWeather(searchInput.value)
});