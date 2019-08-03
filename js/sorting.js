function searchBiggestPrice() {
    posts.sort(compareByPrice);
   // console.log(posts)
}

function searchBiggestRating() {
    posts.sort(compareByRating);
    console.log(posts)

}

function newSort() {
    if (checkRadios()===0){
        clearFeed();
        searchBiggestRating();
        postNumb=0;
        uploadingNewPosts(true)
    }
    else if (checkRadios() === 1){
        clearFeed();
        searchBiggestPrice();
        postNumb=0;
        uploadingNewPosts(true)
    }
    else {
        clearFeed();
        postNumb=0;
        uploadingNewPosts(true)
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
    const genreA = a.price;
    const genreB = b.price;

    let comparison = 0;

        if (genreA > genreB) {
            comparison = 1;
        } else if (genreA < genreB) {
            comparison = -1;
        }

    return comparison;
}