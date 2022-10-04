let long,
  lat,
  temperatureDescription = document.querySelector('.temperature-description'),
  temperatureDegree = document.querySelector('.degree'),
  TimeZone = document.querySelector('.timezone'),
  icons = document.querySelector('.icon');

// App Data
const weather = {};

weather.temperature = {
    unit: 'celsius'
  };

const kelvin = 273;
// API key
const key = '38ae1fdcf1465cb475a32547d1146944'


// Check if the Browser supports Geolocation
if ('geolocation' in navigator){
  navigator.geolocation.getCurrentPosition(setPosition, showError);

}else{
  NotificationElement.style.display = 'block';
  NotificationElement.innerHTML = `<p> Browser does't support Geolocalization`
}

// Set user Position

function setPosition(position){
  long = position.coords.longitude;
  lat = position.coords.latitude;

  getWeather(lat,long);
}

// Show Error when the is an issue with Geolocation Service
function showError(error){
  NotificationElement.style.display = 'block';
  NotificationElement.innerHTML = `<p> ${error.message}`;
}

// get weather from API Provider
function getWeather(lat,long){
  const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`

  // console.log(api)
  fetch(api).then(function(response){
    let data = response.json();
    return data
  })
  .then(function(data){
    weather.temperature.value = Math.floor(data.main.temp - kelvin)
    weather.description = data.weather[0].description;
    weather.iconId = data.weather[0].icon;
    weather.city = data.name;
    weather.country = data.sys.country;
  })
  .then(function(){
    displayWeather();
  })
}


// displaying the weather to UI
function displayWeather(){
  icons.innerHTML = `<img src="./icons/${weather.iconId}.png" alt="" />`;
  // <img src="./icons/${weather.iconId}.png" alt="" />
  console.log(weather.iconId)
  temperatureDegree.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  temperatureDescription.innerHTML = ` ${weather.description}`;
  TimeZone.innerHTML = `${ weather.country }, ${ weather.city }`
}