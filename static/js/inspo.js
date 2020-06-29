
function inspo(){
    fetch('/inspo', {
              headers: {
               'Accept':'application/json'
              }
        }).then(
            function(request){
            console.log(request)
            if(request.status >= 200 && request.status < 400){
                request.json().then(function(data) {
                    img = document.createElement("img");
                    img.className = "img-responsive img-thumbnail img-fluid"
                    img.style = "max-height:400px; width:auto;"
                    img.src = "https://aether.kongaloosh.com/"+data[0]
                    img.crossOrigin="anonymous"
                    document.getElementById("inspo").innerHTML = img.outerHTML;
                }
                )
                }
                }
                )

}



inspo()
window.setInterval(inspo(), 200000);