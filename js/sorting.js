function searchBiggestPrice() {
    postsNow.sort(compareByPrice);
    const fromPrice= parseInt(elem('fromPrice' ).value);
    const toPrice=   parseInt(elem('toPrice' ).value);
    console.log( fromPrice);
    if (typeof fromPrice === "number" && typeof toPrice === "number" && !isNaN(toPrice)&&!isNaN(fromPrice)){
        const newPosts=[];
        for (let x=0;x<postsNow.length;x++) {
            const price = parseInt(postsNow[x].price.substr(0,postsNow[x].price.length-1).replace(/ /g,''));
            if (price >= fromPrice && price <= toPrice){
                console.log(price+ ' '+fromPrice+' '+toPrice);
                newPosts.push(postsNow[x])
            }
        }
        postsNow=newPosts
    }
}

function searchBiggestRating() {
    postsNow.sort(compareByRating);
}

function newSort() {
   if (!onFav) {
       if (checkRadios() === 0) {
           clearFeed();
           searchBiggestRating();
       } else if (checkRadios() === 1) {
           clearFeed();
           searchBiggestPrice();
       } else {
           clearFeed();
           postsNow= shuffle(postsNow);
       }
   }
   else {
       if (checkRadios() === 0) {
           clearFeed();
           searchBiggestRating();
       } else if (checkRadios() === 1) {
           clearFeed();
           searchBiggestPrice();
       } else {
           clearFeed();
           postsNow= shuffle(postsNow);
       }
   }
}

function sortByCity(city) {
    const newPosts= [];
    if (!onFav) {
        if (city !== 'Any') {
            for (let x = 0; x < posts.length; x++) {
                if (posts[x].city === city) {
                    newPosts.push(postsNow[x])
                }
            }
        } else {
            for (let x = 0; x < posts.length; x++) {
                newPosts.push(postsNow[x])
            }
        }
    }
    else {
        if (city !== 'Any') {
            for (let x = 0; x < favPosts.length; x++) {
                if (favPosts[x].city === city) {
                    newPosts.push(postsNow[x])
                }
            }
        } else {
            for (let x = 0; x < postsNow.length; x++) {
                newPosts.push(postsNow[x])
            }
        }
    }
    postsNow=newPosts
}

function checkRadios() {
    if ( elem('rating').checked){
        //sort by biggest rating
        return 0
    }
    else if (elem('price').checked) {
        //sort by lowest price
        return 1
    }
    else {
        return 2
        //sort normaly
    }
}
function compareByRating(a, b) {

    const genreA = a.rating;
    const genreB = b.rating;

    let comparison = 0;
    if (genreA <genreB) {
        return 1;
    } else if (genreA > genreB) {
        return -1;
    }
    return comparison;
}
function compareByPrice(a, b) {
    const genreA = parseInt(a.price.substr(0,a.price.length-1).replace(/ /g,''));
    const genreB = parseInt(b.price.substr(0,b.price.length-1).replace(/ /g,''));;
    let comparison = 0;

        if (genreA > genreB) {
            comparison = 1;
        } else if (genreA < genreB) {
            comparison = -1;
        }

    return comparison;
}
function shuffle(posts) {
    let currentIndex = posts.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = posts[currentIndex];
        posts[currentIndex] = posts[randomIndex];
        posts[randomIndex] = temporaryValue;
    }

    return posts;
}

function takeItemsByType(type,fromPosts) {
    const newPosts =[];
    for (let x=0;x<fromPosts.length ;x++) {
        if (fromPosts[x].type === type){
            newPosts.push(fromPosts[x])
        }
    }
    postsNow=newPosts
}
function search() {
    if (onFav){
        postsNow=favPosts
    }
    else {
        postsNow=posts
    }
    const city = elem('searchCity').value;
    const type = elem('searchType').value;
    const sort = function() {
        if ( elem('rating').checked){
            return 'rating'
        }
        else if (elem('price').checked){
            return 'price'
        }
        else {
            return 'date'
        }
    };
    console.log(city+' '+type+' '+sort());
    sortByCity(city);
//    console.log(postsNow);
    newSort();
//    console.log(postsNow);
    if (type !== '') {
        takeItemsByType(type, postsNow);
    }
//    console.log(postsNow);
    clearFeed();
    postNumb=0;
    uploadingNewPosts(true,postsNow)

}