const selection = document.querySelector(".selection");

const apiKeyInput = document.querySelector(".apikey");
const locationInput = document.querySelector(".location");

const submitBtn = document.querySelector(".submit");

let API_KEY;

if (localStorage.getItem("API_KEY") !== null) {
    API_KEY = localStorage.getItem("API_KEY");

    apiKeyInput.classList.add("hide");

    submitBtn.addEventListener("click", () => {
        let location = locationInput.value;
        console.log(API_KEY);
        console.log(location);
    });
} else {
    submitBtn.addEventListener("click", () => {
        const API_KEY = apiKeyInput.value;
        let location = locationInput.value;
        console.log(API_KEY);
        console.log(location);

        localStorage.setItem("API_KEY", API_KEY);
    });
}

const weatherReport = async (location) => {
    const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`,
        { mode: "cors" }
    );

    const responseJson = await response.json();

    const locationName = responseJson.location.name;
    const regionName = responseJson.location.region;
    const countryName = responseJson.location.country;

    // console.log(countryName);

    const icon = responseJson.current.condition.icon;
    const text = responseJson.current.condition.text;
    const temp = responseJson.current.temp_c;

    const weatherDiv = document.querySelector(".weather");

    const locationElement = document.createElement("div");
    locationElement.classList.add("location-name");
    locationElement.innerHTML = `<div class="location-name">${locationName}</div>`;
    weatherDiv.appendChild(locationElement);

    const regionElement = document.createElement("div");
    regionElement.classList.add("region-name");
    regionElement.innerHTML = `<div class="region-name">${regionName}</div>`;
    weatherDiv.appendChild(regionElement);

    const countryElement = document.createElement("div");
    countryElement.classList.add("country-name");
    countryElement.innerHTML = `<div class="country-name">${countryName}</div>`;
    weatherDiv.appendChild(countryElement);

    const iconElement = document.createElement("div");
    iconElement.classList.add("icon-div");
    iconElement.innerHTML = `<img src="https:${icon}" alt="" class="icon">`;
    weatherDiv.appendChild(iconElement);

    const textElement = document.createElement("div");
    textElement.classList.add("text");
    textElement.innerHTML = `<div class="country-name">${text}</div>`;
    weatherDiv.appendChild(textElement);

    const tempElement = document.createElement("div");
    tempElement.classList.add("temp");
    tempElement.innerHTML = `<div class="country-name">${temp}</div>`;
    weatherDiv.appendChild(tempElement);
};

weatherReport("mumbai");
