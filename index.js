// https://ipgeolocation.abstractapi.com/v1/?api_key=7ee836affeac4ea8952fe72565d53445

async function geo() {
    const myLoc = await fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=7ee836affeac4ea8952fe72565d53445');
    const myLocation = await myLoc.json();
    const myCity = `${myLocation.city}`;
    
    getInfo(myCity);
} 
geo();


const API = {
    endpoint: "https://api.openweathermap.org/data/2.5/",
    key: "6df78de940fe94f92e6ac25b0dea9636"
}

const input = document.querySelector('#input');


input.addEventListener('keydown', enter);

function enter(e) {
    
    if (e.key === 'Enter') {
        getInfo(input.value);
    }
}

async function getInfo(data) {
    
    const res = await fetch(`${API.endpoint}weather?q=${data}&lang=es&units=metric&APPID=${API.key}`);
    const result = await res.json();
    
    displayResult(result);
}

function displayResult(result) {

    let city = document.querySelector('#city');
    city.textContent = `${result.name}, ${result.sys.country}`;

    getOurDate();

    let temperature = document.querySelector('#temperature');
    temperature.innerHTML = `${Math.round(result.main.temp)}<span>º</span>`;

    let feelsLike = document.querySelector('#feelsLike');
    feelsLike.innerHTML = "Sensación térmica: " + `${Math.round(result.main.feels_like)}<span>º</span>`;

    let conditions = document.querySelector('#conditions');
    conditions.textContent = `${result.weather[0].description}`;

    let variations = document.querySelector('#variations');
    variations.textContent = "Día: " + `${Math.round(result.main.temp_max)}` + "º " + "Noche: " + `${Math.round(result.main.temp_min)}` + "º"; 
}

function getOurDate() {
    const myDate = new Date();

    const days = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    let day = days[myDate.getDay()];

    let todayDate = myDate.getDate();

    const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    let month = months[myDate.getMonth()];

    let year = myDate.getFullYear();

    let showDate = document.querySelector('#date');

    showDate.textContent = `${day}` + " " + `${todayDate}` + " " + `${month}` + " " + `${year}`;
}
