

function stocks(){
    // Open a new connection, using the GET request on the URL endpoint
    fetch('/stocks')
        .then(
        function(request){
            if(request.status >= 200 && request.status < 400){
                request.json().then(function(data) {
                    var widget = document.getElementById("stock-carousel");
                    var ticker_entries = document.createElement("div");
                    ticker_entries.className = "carousel-inner";

                    for (var idx = 0; idx < data.length; idx++) {

                        var ticker_container = document.createElement("div");
                        ticker_container.className = "carousel-item";

                        var ticker_wrapper = document.createElement("div");
                        ticker_wrapper.className = "row"

                        if (idx == 0) {
                            ticker_container.className += " active";
                        }

                        // add chart

                        var ticker_entry = document.createElement("div");
                        ticker_entry.className = "d-block col-sm-4";

                        var change = data[idx]['ask'];
                        ticker_entry.innerText = data[idx]["symbol"] + " " + String(change);

                        var chartCanvas = document.createElement("canvas");
                        chartCanvas.id = "myChart" + String(idx);

                        ticker_entry.append(chartCanvas);
                        ticker_wrapper.append(ticker_entry);

                        ticker_entries.append(ticker_container);

                        // add details

                        var quote_details = document.createElement("div");
                        quote_details.className = "d-block col-sm-8"

                        var price = document.createElement("data")
                        price.innerText = data[idx]['ask']
                        price.className = "ask-price"
                        quote_details.append(
                            price
                        ) + " "

                        var open = document.createElement("data")
                        open.innerText = data[idx]['open']
                        open.className = "open"
                        quote_details.append(
                            open
                        ) + " "

                        var high = document.createElement("data")
                        high.innerText = data[idx]['dayHigh']
                        high.className = "high"
                        quote_details.append(
                            high
                        ) + " "

                        var low = document.createElement("data")
                        low.className = "low"
                        low.innerText = data[idx]['dayLow']
                        quote_details.append(
                            low
                        ) + " "


                        var volume = document.createElement("data")
                        volume.innerText = price.innerText = data[idx]['volume']
                        volume.className = "volume"
                        quote_details.append(
                            volume
                        ) + " "
                     ticker_wrapper.append(quote_details)
                     ticker_container.append(ticker_wrapper)


                }

                widget.innerHTML = ticker_entries.outerHTML

                for (var idx = 0; idx < data.length; idx++) {

                   var ctx = document.getElementById("myChart"+String(idx)).getContext('2d');
                    ctx.responsive = true;
                    console.log(Array.from(Array(data[idx]['history'].length).keys()))
                    var myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: data[idx]['history']['label'],
                        datasets: [{
                            label: 'Daily change',
                            data: data[idx]['history']['data'],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                    });
                    }
                }

                );
            }else {
                console.log('error')
            }
        })
}

function setUp(){
    stocks()
}

stocks()

window.setInterval(stocks, 1000000);