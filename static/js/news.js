function news(){
    fetch('/news')
        .then(
        function(request){
            if(request.status >= 200 && request.status < 400){
                request.json().then(function(data) {
                    var widget = document.getElementById("news-carousel");
                    var ticker_entries = document.createElement("div");
                    ticker_entries.className = "carousel-inner";

                    for (var idx = 0; idx < data.length; idx++) {

                        var ticker_container = document.createElement("div");
                        ticker_container.className = "carousel-item";

                        if (idx == 0) {
                            ticker_container.className += " active";
                        }

                        var price = document.createElement("h5");
                        price.innerText = data[idx]["title"]
                        price.className = "ticker_symbol"
                        ticker_container.append(
                            price
                        ) + " "

                        ul = document.createElement('ul');
                        data[idx]['summary'].forEach(function (item) {
                            let li = document.createElement('li');
                            ul.appendChild(li);
                            li.innerHTML += item;
                        });
                        ticker_container.appendChild(ul);

                        var price = document.createElement("p")
                        price.innerText = "Key Entities: " + data[idx]['keywords'].slice(0,10)
                        price.className = ""
                        ticker_container.append(
                            price
                        ) + " "
                     ticker_entries.append(ticker_container)
                }

                widget.innerHTML = ticker_entries.outerHTML
                  }
              )
            }else {
                console.log('error')
            }
        }
   );
}

news()
window.setInterval(news, 600000); // every 10 min
