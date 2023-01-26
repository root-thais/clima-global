//variáveis e seleção de elementos
const apiKey="b3a0478c0a6491bd08ad3d8f52c3e8bd";
const apiCountryUrl="https://www.countryflagicons.com/STYLE/size/COUNTRYCODE.png";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperatura span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

//Funções
const getWeatherData = async (city) => {
    const apiWeatherURl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

        const res = await fetch(apiWeatherURl);
        const data = await res.json();

        return data;
};

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", 
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);

    countryElement.setAttribute("src", apiCountryUrl + data.sys.country) ;
    humidityElement.innerText = `${data.main.umidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;

    weatherContainer.classList.remove("hide");
};

//Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;
    
    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {

    if (e.code === "Enter") {
        const city = e.target.value;
        
        showWeatherData(city);
    
    }
})