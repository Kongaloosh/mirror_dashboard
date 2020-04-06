
function stocks(){
    // Open a new connection, using the GET request on the URL endpoint
    fetch('/stocks')
        .then(
        function(request){
            if(request.status >= 200 && request.status < 400){
                request.json().then(function(data) {
                    var widget = document.getElementById("stock-carousel")
                    var ticker_entries = document.createElement("div")
                    ticker_entries.className = "carousel-inner"

                    for (var idx = 0; idx < data.length; idx++) {

                        var ticker_container = document.createElement("div")
                        ticker_container.className = "carousel-item"

                        if (idx == 0) {
                            ticker_container.className += " active"
                        }

                        var ticker_entry = document.createElement("div")
                        ticker_entry.className = "d-block w-100"

                        var change = data[idx]['regularMarketPrice'] - data[idx]['open']
                        ticker_entry.innerText = data[idx]["symbol"] + " " + String(change)
                        ticker_entry.src = "..."
                        ticker_entry.alt = "Blah" + String(idx)

                        ticker_container.append(ticker_entry)
                        ticker_entries.append(ticker_container)
                    }
                    widget.innerHTML = ticker_entries.outerHTML
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