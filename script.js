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
    const temp = responseJson.current.condition.temp_c;

    const weatherDiv = document.querySelector('.weather');
};

weatherReport("mumbai");
