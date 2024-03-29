let postsNow=[];
let posts = [];
let postNumb=0;
let favPosts=[];
let alreadyInProgress=false;
Array.prototype.insert = function(index) {
    this.splice.apply(this, [index, 0].concat(
        Array.prototype.slice.call(arguments, 1)));
    return this;
};
Object.defineProperty(String.prototype, "reverse", {
    get: function() {
        let arr = this.split('');
        arr.reverse();
        return arr.join('')
    }
});

const elem = (id)=>{
    return document.getElementById(id)
};
const elems = (className)=>{
    return document.getElementsByClassName(className)
};
function ChangeTheme() {
    if (myStorage.getItem('darkMode')==='true') {
        myStorage.setItem('darkMode', false);
        toLight()
    }
    else {
        myStorage.setItem('darkMode', true);
        toDark()
    }

}
function toDark() {
    document.body.style.backgroundColor ='#323232';
    elem('navbar').style.backgroundColor='#412a3a';
    elem('dropdown').style.backgroundColor='#d3af7b';
    elem('nav-toggle').style.backgroundColor='#d3af7b';
    elem('navbar').style.borderColor='#d6dbe9';
    elem('navtoggle').style.borderColor='#ffffff';
    elem('feed').style.color='#d6dbe9';
    elem('shop').style.color='#d6dbe9';
    elem('business').style.color='#d6dbe9';
    elem('help').style.color='#d6dbe9';
    elem('searchTerm').style .backgroundColor='#5b5c63';
    elem('searchType').style .backgroundColor='#5b5c63';
    elem('searchMetro').style.backgroundColor='#5b5c63';
    elem('suggestions').style.backgroundColor='#5b5c63';
    elem('searchCity').style .backgroundColor='#5b5c63';
    elem('searchTerm').style .borderColor='#00869b';
    elem('searchType').style .borderColor='#00869b';
    elem('searchMetro').style.borderColor='#00869b';
    elem('suggestions').style.borderColor='#00869b';
    elem('searchCity').style .borderColor='#00869b';
    elem('searchButton').style .backgroundColor='#00869b';
    document.body.style.color='#d6dbe9';
    for(let i = 0; i < elems('item').length; i++) {
        elems('item')[i].style.backgroundColor = '#6E6E6E';
    }
    elem('Theme').innerText = 'Night';
    elem('ThemeMenu').innerText = 'Night'
}
function toLight() {
    document.body.style.backgroundColor ='#FBFDFF';
    elem('navbar').style.backgroundColor='#FAF5FF';
    elem('dropdown').style.backgroundColor='#FAF5FF';
    elem('nav-toggle').style.backgroundColor='#FAF5FF';
    elem('navbar').style.borderColor='#000000';
    elem('navtoggle').style.borderColor='#000000';
    elem('feed').style.color=    '#000000';
    elem('shop').style.color=    '#000000';
    elem('business').style.color='#000000';
    elem('help').style.color=    '#000000';
    document.body.style.color=       '#000000';
    elem('searchTerm').style.backgroundColor='#FBFDFF';
    elem('searchMetro').style.backgroundColor='#FBFDFF';
    elem('searchType').style.backgroundColor='#FBFDFF';
    elem('suggestions').style.backgroundColor='#FBFDFF';
    elem('searchCity').style.backgroundColor='#FBFDFF';
    elem('searchTerm').style .borderColor='#00B4CC';
    elem('searchType').style .borderColor='#00B4CC';
    elem('searchMetro').style.borderColor='#00B4CC';
    elem('suggestions').style.borderColor='#00B4CC';
    elem('searchCity').style .borderColor='#00B4CC';
    elem('searchButton').style .backgroundColor='#00B4CC';
    for(let i = 0; i < elems('item').length; i++) {
        elems('item')[i].style.backgroundColor = '#FFF5F7';
    }
    elem('Theme').innerText = 'Day';
    elem('ThemeMenu').innerText = 'Day'

}