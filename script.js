const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weather_img = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const wind_speed = document.getElementById("wind-speed");
const humidity = document.getElementById("humidity");
const location_not_found = document.querySelector(".location-not-found");

async function checkWeather(city) {
  const api_key = "273a65335d3143bbf04e3361c358f433";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  const weather_data = await fetch(`${url}`).then((response) =>
    response.json()
  );

  if (weather_data.cod === `404`) {
    location_not_found.style.display = "flex";
    weather_body.style.display = "none";
    console.log("error");
    return;
  }

  location_not_found.style.display = "none";
  weather_body.style.display = "flex";

  const weather_body = document.querySelector(".weather-body");
  temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
  console.log(weather_data);
  description.innerHTML = `${weather_data.weather[0].description}`;
  humidity.innerHTML = `${weather_data.main.humidity}%`;
  wind_speed.innerHTML = `${weather_data.wind.speed}km/H`;

  switch (weather_data.weather[0].main) {
    case "Clouds":
      weather_img.src = "/assets/cloud.png";
      break;
    case "Clear":
      weather_img.src = "/assets/clear.png";
      break;
    case "Rain":
      weather_img.src = "/assets/rain.png";
      break;
    case "Mist":
      weather_img.src = "/assets/mist.png";
      break;
    case "Snow":
      weather_img.src = "/assets/snow.png";
      break;
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
});
