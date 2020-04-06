

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

                        if (idx == 0) {
                            ticker_container.className += " active";
                        }

                        var ticker_entry = document.createElement("div");
                        ticker_entry.className = "d-block w-100";

                        var change = data[idx]['regularMarketPrice'] - data[idx]['open'];
                        ticker_entry.innerText = data[idx]["symbol"] + " " + String(change);

                        var chartCanvas = document.createElement("canvas");
                        chartCanvas.id = "myChart" + String(idx);

                        ticker_entry.append(chartCanvas);
                        ticker_container.append(ticker_entry);
                        ticker_entries.append(ticker_container);

                }

                widget.innerHTML = ticker_entries.outerHTML

                for (var idx = 0; idx < data.length; idx++) {

                   var ctx = document.getElementById("myChart"+String(idx)).getContext('2d');
                        ctx.fillStyle = "#92B901";
                        ctx.fillRect(50, 50, 100, 100);
                        console.log(data)
                        var myChart = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                            datasets: [{
                                label: '# of Votes',
                                data: [12, 19, 3, 5, 2, 3],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
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

/*
        =====================================================================
                                    Carousel
        =====================================================================
*/

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex-1].style.display = "block";

}