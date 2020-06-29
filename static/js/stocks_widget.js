

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
                        ticker_entry.className = "d-block col-sm-6";
                        var title = data[idx]["symbol"]
                        var change = data[idx]['ask'];

                        var chartCanvas = document.createElement("canvas");
                        chartCanvas.id = "myChart" + String(idx);

                        ticker_entry.append(chartCanvas);
                        ticker_wrapper.append(ticker_entry);

                        ticker_entries.append(ticker_container);

                        // add details

                        var quote_details = document.createElement("div");
                        quote_details.className = "d-block col-sm-6"

                        var price = document.createElement("h4")
                        price.innerText = data[idx]["symbol"]
                        price.className = "ticker_symbol text-center"
                        quote_details.append(
                            price
                        ) + " "

                        var price = document.createElement("h4")
                        price.innerText = "Current Ask: " + data[idx]['ask'].toString()
                        price.className = "ask-price"
                        quote_details.append(
                            price
                        ) + " "

                        var open = document.createElement("h4")
                        open.innerText ="Open: " + data[idx]['open'].toString()
                        open.className = "open"
                        quote_details.append(
                            open
                        ) + " "

                        var high = document.createElement("h4")
                        high.innerText = "Today's High:"  + data[idx]['dayHigh'].toString()
                        high.className = "high"
                        quote_details.append(
                            high
                        ) + " "

                        var low = document.createElement("h4")
                        low.className = "low"
                        low.innerText = "Today's low: " + data[idx]['dayLow'].toString()
                        quote_details.append(
                            low
                        ) + " "


                        var volume = document.createElement("h4")
                        volume.innerText = "Volume traded: " + data[idx]['volume'].toString()
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
                    var myChart = new Chart(ctx,
                    {
                        type: 'line',
                        data: {
                            labels: data[idx]['history']['label'],
                            datasets: [{
                                label: 'Daily change',
                                data: data[idx]['history']['data'],
                                borderWidth: 1,
                                borderColor: 'rgb(235, 255, 236)',
                                pointBackgroundColor: 'rgb(235, 255, 236)',
                            }]
                        },
                        options: {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: false,
                                        fontColor:'rgb(235, 255, 236)',
                                    },
                                    gridLines: {
                                        color: 'rgb(235, 255, 236, 0.3)',
                                        display: true,
                                  },
                                }],
                                xAxes: [{
                                    ticks: {
                                        fontColor:'rgb(235, 255, 236)',
                                    },
                                    gridLines: {
                                        color: 'gb(235, 255, 236, 0.3)',
                                        display: true,
                                  },
                                }]
                            },
                          pointLabels: {
                            fontColor: 'white' // labels around the edge like 'Running'
                          },
                        }
                    }

                    );
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

window.setInterval(stocks, 600000);