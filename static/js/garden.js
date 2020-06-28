function garden_HUD(){
    // Open a new connection, using the GET request on the URL endpoint
    fetch('/garden')
        .then(
        function(request){
            console.log(request)
            if(request.status >= 200 && request.status < 400){
                request.json().then(function(data) {
                    document.getElementById("garden_temperature").innerText = "Temperature: " + data['temperature'].shift().toPrecision(2).toString() + '\u2103';
                    document.getElementById("garden_moisture").innerText = "Soil Mositure: " + ((1 - data['moistness'].shift())*100).toPrecision(2).toString() + '\u0025';
                    document.getElementById("garden_humidity").innerText = "Humidity: " + data['humidity'].shift().toPrecision(2).toString() + '\u0025';
                    document.getElementById("garden_pic").src = "http://192.168.1.12/" + data['image'].shift()
                });
            }else {
                console.log('error')
            }
        })
}


garden_HUD()

window.setInterval(garden_HUD, 60000);
