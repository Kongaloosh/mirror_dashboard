var mydata = JSON.parse(config);
console.log(mydata)
//var api_key = config.get('OpenWeather', 'key');
//var id = config.get('OpenWeather', 'id');
//var name = config.get('OpenWeather', 'name');
//var country = config.get('OpenWeather', 'country');

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'api.openweathermap.org/data/2.5/weather?id='+toString(id)+'&appid='+toString(api_key), true)

request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)

  if (request.status >= 200 && request.status < 400) {
//    data.forEach(console.log())
    console.log(data)
  } else {
    console.log('error')
  }
}


// Send request
request.send()