function searchBiggestPrice() {
    posts.sort(compareByPrice);
    console.log(posts)
}

function searchBiggestRating() {
    posts.sort(compareByRating);
//    console.log(posts)

}

function newSort() {
    if (checkRadios()===0){
        clearFeed();
        searchBiggestRating();
        postNumb=0;
        postsNow=posts;
        uploadingNewPosts(true,postsNow)
    }
    else if (checkRadios() === 1){
        clearFeed();
        searchBiggestPrice();
        postNumb=0;
        postsNow=posts;
        uploadingNewPosts(true,postsNow)
    }
    else {
        clearFeed();
        shuffle(posts);
        postsNow=posts;
        postNumb=0;
        uploadingNewPosts(true,postsNow)
    }
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
    const genreA = parseInt(a.price.substr(0,a.price.length-1).replace(' ',''));
    const genreB = parseInt(b.price.substr(0,b.price.length-1).replace(' ',''));;
    console.log(a.price +' >'+ b.price+' '+(a.price >b.price))
    let comparison = 0;

        if (genreA > genreB) {
            comparison = 1;
        } else if (genreA < genreB) {
            comparison = -1;
        }

    return comparison;
}
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
