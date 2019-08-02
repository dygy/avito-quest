let postNumb=0;
function toPost(data) {
    console.log(data);
    if (data.price !== undefined) {
        createNewPost(data)
    }
}

function fetching() {
    fetch("https://avito.dump.academy/products/")
        .then(response=>{
            return response.json()
        })
        .then(function (defs) {
            for (let i=0;i<defs.data.length;i++) {
                posts.push(defs.data[i])
            }
            uploadingNewPosts()
        })
        .catch(
        // Отправить на сервер для метрики
        );
}
function uploadingNewPosts() {
    let x=postNumb;
    for (x;x<postNumb+10&&postNumb<posts.length  ;x++) {
        toPost(posts[x])
    }
    postNumb=x
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
                alert("city title is: " + city);
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
    if (((window.innerHeight + window.scrollY) >= document.body.scrollHeight)&&!onFav) {
        uploadingNewPosts()

    }
};