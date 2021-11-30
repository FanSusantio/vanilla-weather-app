function formatDate(timestamp) {
  // calculate the date
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];

  let forecastHTML = `<div class="row">`;

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
                  <div class="col-2">
                <div class="weather-forecast-date">${day}</div>
                <img
                  src="http://openweathermap.org/img/wn/01n@2x.png"
                  alt=""
                  width="55"
                />
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-temperature-max">18°</span>
                  <span class="weather-forecast-temperature-min">12°</span>
                </div>
              </div>
            `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "a74b2bfdc6455b21c1aa51ce43d055d0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#current-temp");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `${response.data.weather[0].description}`);

  getForecast(response.data.coord);
}

function search(cityInput) {
  let apiKey = "a74b2bfdc6455b21c1aa51ce43d055d0";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  // remove the active class to the celsius link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  // remove the active class to the fahrenheit link
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

// search functionality (form is a global variable)

// * as per SheCodes demo * //
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let searchButton = document.querySelector(".search_btn");
searchButton.addEventListener("click", handleSubmit);

// temperature unit conversion (fahrenheitLink is a global variable)
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

//default search on first load
search("Melbourne");
