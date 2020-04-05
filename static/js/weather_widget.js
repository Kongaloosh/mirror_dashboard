
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

dayNames = ['Mon', "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"]

var request = new XMLHttpRequest()
// Open a new connection, using the GET request on the URL endpoint
request.open('GET', '/weather', true)

window.setInterval(function(){
    var today = new Date();
    document.getElementById("date").innerText = dayNames[today.getDay()-1]+' '+monthNames[today.getMonth()]+' '+today.getDate();
    document.getElementById("time").innerText = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
}, 1000);


window.setInterval(function(){
    var data = JSON.parse(request.response)
    // Send request
    if (request.status >= 200 && request.status < 400) {
        document.getElementById("weather-icon").className = 'fa ' + icons[data['weather'][0]['description']]
        document.getElementById("weather-temp").innerText = data['main']['feels_like'].toString() + '\u2103'
    console.log(data)
  } else {
    console.log('error')
  }

}, 10000);

request.send()