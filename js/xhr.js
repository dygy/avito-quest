let postNumb=0;
function toPost(data, exist) {
//    console.log(data);
//НЕ ЗАБЫТЬ ОБРАБОТАТЬ ОСТАЛЬНЫЕ ОБЪЯВЛЕНИЯ
    if ((data.price !== undefined &&!exist)||data.date === undefined) {
        createNewPost(data)
    }
    else if (data.price!== undefined && exist){
        createPost(data)
    }

}

async function fetching() {
   await fetch("https://avito.dump.academy/products/")
        .then(response=>{
            return response.json()
        })
        .then(function (defs) {
            console.log(defs.data);
            for (let i=0;i<defs.data.length;i++) {
                if (defs.data[i].price!==undefined) {

                    posts.push(defs.data[i])
                }
            }

        })
        .catch(
        // Отправить на сервер для метрики
        );
}
function uploadingNewPosts(exist,posts) {
    let x=postNumb;
    for (x; x<postNumb+10 && x<posts.length  ;x++) {
        toPost(posts[x],exist)
    }
    postNumb=x
}
fetching().then(searchForSellers);
async function searchForSellers(){
    const authors  =  await fetch("https://avito.dump.academy/sellers/")
            .then(response => {
                return response.json()
            })
            .then( function (defs) {
                console.log(defs.data);
                return defs.data;
            })
            .catch(function (error) {
                    return error
                // Отправить на сервер для метрики
                }
            );
    for (let x = 0;x<posts.length;x++) {
        normalizePrices(x);
        for (let y = 0;y<authors.length ;y++){
            console.log(authors[y]);
            if (posts[x].relationships.seller === authors[y].id){
                posts[x].author = authors[y];
                posts[x].rating= authors[y].rating
            }
        }
    }
    uploadingNewPosts(false,posts)
}
function normalizePrices(x){
    posts[x].price = priceOf(posts[x].price)
}
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
        uploadingNewPosts(false,postsNow)

    }
};