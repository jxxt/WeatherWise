const selection = document.querySelector(".selection");

const apiKeyInput = document.querySelector(".apikey");
const locationInput = document.querySelector(".location");

const submitBtn = document.querySelector(".submit");

let API_KEY;

const weatherReport = async (API_KEY, locationn) => {
    const weatherDiv = document.querySelector(".weather");

    selection.classList.add("hide");
    weatherDiv.classList.remove("hide");

    const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${locationn}`,
        { mode: "cors" }
    );

    const responseJson = await response.json();

    const locationName = responseJson.location.name;
    const regionName = responseJson.location.region;
    const countryName = responseJson.location.country;

    const icon = responseJson.current.condition.icon;
    const text = responseJson.current.condition.text;
    const temp = Math.round(responseJson.current.temp_c);

    const locationElement = document.createElement("div");
    locationElement.classList.add("location-details");
    locationElement.innerHTML = `<div class="line1"><div class="location-name">${locationName}</div></div><div class="line2"><div class="region-name">${regionName}, ${countryName}</div></div>`;
    weatherDiv.appendChild(locationElement);

    const iconElement = document.createElement("div");
    iconElement.classList.add("icon-temp");
    iconElement.innerHTML = `<img src="https:${icon}" alt="" class="icon"><div class="temp">${temp}°C</div>`;
    weatherDiv.appendChild(iconElement);

    const textElement = document.createElement("div");
    textElement.classList.add("text");
    textElement.innerHTML = `<div class="country-name">${text}</div>`;
    weatherDiv.appendChild(textElement);
};

if (
    localStorage.getItem("API_KEY") !== null &&
    localStorage.getItem("location") !== null
) {
    API_KEY = localStorage.getItem("API_KEY");
    let locationn = localStorage.getItem("location");

    apiKeyInput.classList.add("hide");
    locationInput.classList.add("hide");

    weatherReport(API_KEY, locationn);
} else {
    submitBtn.addEventListener("click", () => {
        API_KEY = apiKeyInput.value;
        let locationn = locationInput.value;

        console.log(API_KEY);
        console.log(location);

        localStorage.setItem("API_KEY", API_KEY);
        localStorage.setItem("location", locationn);

        weatherReport(API_KEY, locationn);
    });
}
