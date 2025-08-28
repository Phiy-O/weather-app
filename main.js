const weatherForm = document.querySelector(".weatherForm");
const containerBg = document.querySelector(".container")
const cardContainer = document.querySelector(".card-container")
const locationInput = document.getElementById("location");
const displayLocation = document.getElementById("display-location");
const displayDate = document.getElementById("date");
const temperature = document.getElementById("temperature");
const weatherIcon = document.getElementById("weather-icon");
const weatherStatus = document.getElementById("weather-status");
const displayTime = document.getElementById("time");
const apiKey = "9b25fe488ce87b1a8f2f0f190da8a7d0";
const todayDate = new Date()

weatherForm.addEventListener("submit", async event => {
    
    event.preventDefault();
    
    const city = locationInput.value;
    
    
    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch(error){
            console.log(error)
            displayError(error)
        }
        
    } else {
        displayError("Hey there!")
    }
    
    locationInput.value = '';
})

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
    const response = await fetch(apiUrl)
    
    console.log(response)
    
    if (!response.ok){
        throw new Error("Couldn't find location!");
    }
    
    return await response.json();
}

function displayWeatherInfo(data) {
    const {name: city, 
        main: {temp, humidity}, 
        weather: [{description, id, main}]} = data;
        
        let celcius = temp - 273.15

        displayLocation.textContent = city;
        temperature.textContent = `${Math.floor(celcius)}°C`;
        weatherStatus.textContent = description;
        getWeatherIcon(main);
        setBackground(id)
        
        console.log(data)
    }
    
function getWeatherIcon(weatherInformation) {
    if (weatherInformation == 'Rain') {
        weatherIcon.src = "assets/rain.png";
        cardContainer.style.background = 'url("assets/rainy.jpg")'
        cardContainer.style.backgroundSize = "cover";
        cardContainer.style.backgroundPosition = "center";
        cardContainer.style.backgroundRepeat = "no-repeat";
        cardContainer.style.filter = "brightness(0.8)"
    } else if (weatherInformation == "Clouds") {
        weatherIcon.src = "assets/cloudy-day.png";
        cardContainer.style.background = 'url("assets/overcast.jpg")'
        cardContainer.style.backgroundSize = "cover";
        cardContainer.style.backgroundPosition = "center";
        cardContainer.style.backgroundRepeat = "no-repeat";
        cardContainer.style.filter = "brightness(0.8)"
    } else {
        weatherIcon.src = "assets/clear-sky.png";
        cardContainer.style.background = 'url("assets/sunny.jpg")'
        cardContainer.style.backgroundSize = "cover";
        cardContainer.style.backgroundPosition = "center";
        cardContainer.style.backgroundRepeat = "no-repeat";
        cardContainer.style.filter = "brightness(0.8)"
    }
}
    
function displayError(message) {
    Swal.fire({
        title: message,
        text: "You didn’t type a city 😅. Let’s give it another try!",
        icon: "question"
    });
}
    
function showDate() {
    const options = {day: "numeric", month: "long", year: "numeric"};
    displayDate.textContent = todayDate.toLocaleDateString("en-US", options);
}

function showTime() {
    const getTime = todayDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    displayTime.textContent = getTime;
}

function setBackground(weatherId) {
  if (weatherId === 800) {
    containerBg.style.background = "linear-gradient(135deg, #56CCF2, #2F80ED)"; // clear
  } else if (weatherId >= 801 && weatherId <= 804) {
    containerBg.style.background = "linear-gradient(135deg, #bdc3c7, #2c3e50)"; // cloudy
  } else if (weatherId >= 200 && weatherId < 600) {
    containerBg.style.background = "linear-gradient(135deg, #4b79a1, #283e51)"; // rain/storm
  } else {
    containerBg.style.background = "linear-gradient(135deg, #0f2027, #2c5364)"; // night/other
  }
}

showTime()
showDate()