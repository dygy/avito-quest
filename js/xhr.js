function loadXMLDoc() {
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === XMLHttpRequest.DONE) { // XMLHttpRequest.DONE == 4
            if (xmlhttp.status === 200) {
                const obj =JSON.parse(xmlhttp.responseText);
            //    console.log(obj.data);
                for (let x=0;x<15;x++) {
                    toPost(obj.data[x])
                }

            }
            else if (xmlhttp.status === 400) {
                alert('There was an error 400');
            }
            else {
                alert('something else other than 200 was returned');
            }
        }
    };

    xmlhttp.open("GET", "http://avito.dump.academy/products/", true);
    xmlhttp.send();
}
function toPost(data) {
    console.log(data);
    if (data.price !== undefined) {
        createNewPost(data.title, data.address, data.price.toString(), data.pictures[0], data.category, data.year)
    }
}
loadXMLDoc();



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
        // you're at the bottom of the page
        loadXMLDoc();
        console.log("Bottom of page");
    }
};