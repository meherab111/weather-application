let loadBody = document.body;

let inputFieldForm = document.querySelector(".input_field_form");

let inputField = document.querySelector(".input_field");

let weatherAddress = document.querySelector(".weather_address");

let weatherDate = document.querySelector(".weather_date");

let weatherIcon = document.querySelector(".weather_icon_div");

let weatherTemp = document.querySelector(".weather_temp");

let weatherMin = document.querySelector(".weather_min");

let weatherMax = document.querySelector(".weather_max");

let weatherFeelsLike = document.querySelector(".weather_feels_like");

let weatherHumidity = document.querySelector(".weather_humidity");

let weatherWind = document.querySelector(".weather_wind");

let weatherPressure = document.querySelector(".weather_pressure");

let city = "dhaka";

// Search City

inputFieldForm.addEventListener("submit", (e) => {
  e.preventDefault();

  city = inputField.value;

  fetchApiDataFunc();

  inputField.value = "";
});

// Fetch Functionality

const fetchApiDataFunc = async () => {
  const fetchedApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=e687b23172c6437d96093a197c9e283e`;

  try {
    let result = await fetch(fetchedApi);
    let fetchedData = await result.json();

    const { main, name, sys, weather, wind, dt } = fetchedData;

    // Using Intl Api To Display Country Full Name

    const regionNamesInEnglish = new Intl.DisplayNames([sys.country], {
      type: "region",
    });
    weatherAddress.textContent = `${name}, ${regionNamesInEnglish.of(
      sys.country
    )}`;

    // Using Intl Api To Display Date And Time

    let dateTime = new Date(dt * 1000);
    const dateTimeObj = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const dateInFullFormat = new Intl.DateTimeFormat("en-US", dateTimeObj);
    weatherDate.textContent = dateInFullFormat.format(dateTime);

    // Displaying All The Info

    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" /> <p class="W_stat">${weather[0].main}</p>`;

    weatherTemp.innerHTML = `${(main.temp - 273.15).toFixed(2)}&#176`;

    weatherMin.innerHTML = `Min : ${(main.temp_min - 273.15).toFixed(2)}&#176`;

    weatherMax.innerHTML = `Max : ${(main.temp_max - 273.15).toFixed(2)}&#176`;

    weatherFeelsLike.innerHTML = `${(main.feels_like - 273.15).toFixed(
      2
    )}&#176`;

    weatherHumidity.innerHTML = `${main.humidity}%`;

    weatherWind.innerHTML = `${(wind.speed * 3.6).toFixed(2)}Km/h`;

    weatherPressure.innerHTML = `${main.pressure * 100}Pa`;
  } catch (error) {
    alert("Sorry ! Couldn't find that City !");
  }
};

// Load Functionality

loadBody.addEventListener("load", fetchApiDataFunc());
