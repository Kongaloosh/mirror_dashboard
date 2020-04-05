
function stocks(){
    // Open a new connection, using the GET request on the URL endpoint
    fetch('/stocks')
        .then(
        function(request){
            if(request.status >= 200 && request.status < 400){
                request.json().then(function(data) {
                    var widget = document.getElementById("stock-widget")
                    var ticker = document.createElement("p")
                    for (var idx = 0; idx < data.length; idx++) {
                        var change = data[idx]['regularMarketPrice'] - data[idx]['open']
                        ticker.innerText = data[idx]["symbol"] + " " + String(change)
                        widget.append(ticker)
                    }
                    console.log(data)
                });
            }else {
                console.log('error')
            }
        })
}
function setUp(){
    stocks()
}

window.setInterval(stocks, 10000);


