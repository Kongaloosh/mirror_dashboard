
icons = {
    'clear sky':'fa-sun',
    'scattered clouds':'fa-cloud-sun',
    'few clouds':'fa-cloud-sun',
    'broken clouds':'fa-cloud',
    'shower rain':'fa-cloud-rain',
    'rain':'fa-cloud-showers-heavy',
    'thunderstorm':'fa-bolt',
    'snow':'fa-snowflake',
    'mist':'fa-smog',
}

monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"]

dayNames = ["Sun", 'Mon', "Tues", "Wed", "Thur", "Fri", "Sat"]

function weather(){
    // Open a new connection, using the GET request on the URL endpoint
    fetch('/weather')
        .then(
        function(request){
            if(request.status >= 200 && request.status < 400){
                request.json().then(function(data) {
                    document.getElementById("weather-icon").className = 'fa ' + icons[data['weather'][0]['description']];
                    document.getElementById("weather-temp").innerText = data['main']['feels_like'].toString() + '\u2103';
                    console.log(data)
                });
            }else {
                console.log('error')
            }
        })
}

function time(){
    var today = new Date();
    document.getElementById("date").innerText = dayNames[today.getDay()]+' '+monthNames[today.getMonth()]+' '+today.getDate();
    document.getElementById("time").innerText = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
}

function setUp(){
    weather()
    time()
}

window.setInterval(time, 1000);

window.setInterval(weather, 10000);

