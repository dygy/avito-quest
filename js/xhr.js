async function fetching() {
   await fetch("https://avito.dump.academy/products/")
        .then(response=>{
            return response.json()
        })
        .then(function (defs) {
            for (let i=0;i<defs.data.length;i++) {
                const post = defs.data[i];
                if (defs.data[i].price!==undefined) {
                    post.price =priceOf(post.price);
                    post.hasPrice =true
                }
                else {
                    const post = defs.data[i];
                    post.price =post.rooms+' Комнаты';
                    post.hasPrice = false
                }
                post.isLiked=false;
                const random = Math.random()*3;
                if (random<=1){
                    post.city = 'Moscow';

                }
                else if (random <= 2) {
                    post.city = 'Peter';
                }
                else {
                    post.city = 'Chota';
                }
                post.photo = post.pictures[0];
                let date = new Date();
                if (post.date === ''||post.date === undefined) {
                    if (date.getMinutes().toString().length === 2) {
                        post.date = 'Сегодня ' + date.getHours() + ' : ' + date.getMinutes();
                    } else {
                        post.date = 'Сегодня ' + date.getHours() + ' :  0' + date.getMinutes();
                    }
                }
                post.type=post.category;
                date = null;
                postsNow = posts;
                posts.push(defs.data[i]);
            }

        })
        .catch(
        // Отправить на сервер для метрики
        );
}
function uploadingNewPosts(exist,posts) {
    let x=postNumb;
    for (x; x<posts.length  ;x++) {
        if (x<postNumb+10) {
            publishPost(posts[x])
        }
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
                return defs.data;
            })
            .catch(function (error) {
                    return error
                // Отправить на сервер для метрики
                }
            );
    for (let x = 0;x<posts.length;x++) {
        for (let y = 0;y<authors.length ;y++){
            if (posts[x].relationships.seller === authors[y].id){
                posts[x].author = authors[y];
                posts[x].rating= authors[y].rating
            }
        }
    }
    uploadingNewPosts(false,posts)
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