/*
function ajaxing() {
    $.ajax({
        url: "https://avito.dump.academy/products/",
        success: function (data) {
            for (let x=0;x<10 ;x++) {
                console.log(data);
                toPost(data.data[x])
            }
        }
    });
}
ajaxing();
*/
function toPost(data) {
    console.log(data);
    if (data.price !== undefined) {
        createNewPost(data.title, data.address, data.price.toString(), data.pictures[0], data.category, data.year)
    }
}

function fetching() {
    fetch("https://avito.dump.academy/products/")
        .then(response=>{
            return response.json()
        })
        .then(function (defs) {
            for (let x=0;x<10 ;x++) {
                const post = defs.data[x];
                toPost(post)
            }
        })
        .catch(alert);
}


fetching();


/*
    "links":
        {
            "products":"http://avito.dump.academy/products",
            "product":"http://avito.dump.academy/products/:1",
            "sellers":"http://avito.dump.academy/sellers",
            "seller":"http://avito.dump.academy/sellers/:1"}


let geocoder;
geocoder = new google.maps.Geocoder();
const latlng = new google.maps.LatLng(latitude, longitude);

geocoder.geocode(
    {'latLng': latlng},
    function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                var add= results[0].formatted_address ;
                var  value=add.split(",");

                count=value.length;
                country=value[count-1];
                state=value[count-2];
                city=value[count-3];
                alert("city name is: " + city);
            }
            else  {
                alert("address not found");
            }
        }
        else {
            alert("Geocoder failed due to: " + status);
        }
    }
);
*/
window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        //ajaxing()
        fetching();
        console.log("Bottom of page");
    }
};