const elem = (id)=>{
    return document.getElementById(id)
};
const elems = (className)=>{
    return document.getElementsByClassName(className)
};
function toDarkMode  () {
    if (myStorage.getItem('darkMode')==='true') {
        myStorage.setItem('darkMode', false);
        toDark()
    }
    else {
        myStorage.setItem('darkMode', true);
        toLight()
    }

}
function toDark() {
    document.body.style.backgroundColor ='#323232';
    elem('navbar').style.backgroundColor='#412a3a';
    elem('feed').style.color='#d6dbe9';
    elem('shop').style.color='#d6dbe9';
    elem('business').style.color='#d6dbe9';
    elem('help').style.color='#d6dbe9';
    document.body.style.color='#d6dbe9'
    for(let i = 0; i < elems('item').length; i++) {
        elems('item')[i].style.backgroundColor = '#6E6E6E';
    }
}
function toLight() {
    document.body.style.backgroundColor ='#FBFDFF';
    elem('navbar').style.backgroundColor='#FAF5FF';
    elem('feed').style.color=    '#000000';
    elem('shop').style.color=    '#000000';
    elem('business').style.color='#000000';
    elem('help').style.color=    '#000000';
    document.body.style.color=       '#000000';
    for(let i = 0; i < elems('item').length; i++) {
        elems('item')[i].style.backgroundColor = '#FFF5F7';
    }
}