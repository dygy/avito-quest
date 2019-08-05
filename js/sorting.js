function searchBiggestPrice() {
    for (let x=0;x<postsNow.length;x++){
        if (!postsNow[x].hasPrice){
            postsNow.splice(x,1);
            x--;
        }
    }
    postsNow.sort(compareByPrice);
    const fromPrice= parseInt(elem('fromPrice' ).value);
    const toPrice=   parseInt(elem('toPrice' ).value);
    if (typeof fromPrice === "number" && typeof toPrice === "number" && !isNaN(toPrice)&&!isNaN(fromPrice)){
        const newPosts=[];
        for (let x=0;x<postsNow.length;x++) {
            const price = parseInt(postsNow[x].price.substr(0,postsNow[x].price.length-1).replace(/ /g,''));
            if (price >= fromPrice && price <= toPrice){
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
    const name = elem('searchTerm').value;
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
    console.log(city+' '+type+' '+sort()+' '+ name);

    sortByCity(city);
    if (name !==''){
        postsNow=  searchByName(name)
    }
    newSort();
    if (type !== '') {
        takeItemsByType(type, postsNow);
    }
    clearFeed();
    postNumb=0;
    if (postsNow.length>0) {
        uploadingNewPosts(true, postsNow)
    }
    else {
        elem('noPosts').className=''
    }
}
function searchByName(name) {
    return  postsNow.filter(function (elem) {
            return (elem.title.indexOf(name.toLowerCase()) > -1||elem.title.indexOf(name.toUpperCase()) > -1||elem.title.indexOf(name) > -1);
    });
}