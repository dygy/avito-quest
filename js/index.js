let onFav = false;
myStorage = localStorage;
let favorIndex;
if (myStorage.getItem('favorIndex')===undefined||myStorage.getItem('favorIndex')===null){
    myStorage.setItem('favorIndex',0);
    favorIndex=0
}else {
    favorIndex = myStorage.getItem('favorIndex')
}
console.log(myStorage);
const flexbox = document.getElementsByClassName('flexbox')[0];
let clr;
const changeColor = (id, color) =>{
    if (color ==='red') {
        clr = document.getElementById(id).style.color;
    }
    document.getElementById(id).style.color = color
};

function replaceStorage(isLiked) {
    if (favorIndex>1){
        let x;
        myStorage.removeItem('favor'+isLiked);
        for ( x=isLiked+1;x<favorIndex-1;x++){
            myStorage.setItem('favor'+x-1,myStorage.getItem('favor'+x));
            myStorage.removeItem('favor'+x)
        }

    }
}

//myStorage.clear();
const addToFavor=(param)=>{
    const post = param.path[0];
    const obj = JSON.parse(post.data);
    console.log(!/liked/g.test(post.className));
    if (!/liked/g.test(post.className)) {
        param.path[0].className= 'liked '+param.path[0].className;
        obj.isLiked=favorIndex;
        myStorage.setItem('favor' + favorIndex, JSON.stringify(obj));
        favorIndex++;
        myStorage.setItem('favorIndex', favorIndex);
    }
    else {
    //    console.log(obj.isLiked);
        myStorage.removeItem('favor' + obj.isLiked);

        favorIndex--;
        replaceStorage(obj.isLiked);
        param.path[0].className = param.path[0].className.replace(/liked/, '')
        myStorage.setItem('favorIndex', favorIndex);
        if (onFav) {
     //       console.log(param.path);
                param.path[1].parentNode.removeChild(param.path[1])
        }
    }
};
const publishPost=(post)=>{
    const node = document.createElement("div");                 // Create a <li> node
    node.className = 'item ' + post.type;
    node.alt = '';
    const symbolNode = document.createElement('i');
    if (post.isLiked !== false) {
        symbolNode.className = 'fa fa-heart-o upOnPhoto liked index' + post.id;
    }
    else {
        symbolNode.className = 'fa fa-heart-o upOnPhoto index' + post.id;
    }
    symbolNode.onclick = addToFavor;
    const imgNode = document.createElement('img');
    imgNode.src = post.photo;
    imgNode.style.width = '240px';
    imgNode.style.height = '150px';
    imgNode.style.zIndex = 0;
    const textNode = document.createElement('p');
    const priceNode = document.createElement('strong');
    priceNode.innerText = post.price;
    const nameNode = document.createElement('a');
    nameNode.innerText = post.title;
    const cityNode = document.createElement('span');
    cityNode.innerText = post.city;
    const dateNode = document.createElement('date');
    dateNode.innerText = post.date;
    const authorNode = document.createElement('date');
    authorNode.innerText = post.author.name+' {'+post.rating+'}';
    symbolNode.data = JSON.stringify(post);
    node.appendChild(imgNode);
    node.appendChild(symbolNode);
    node.appendChild(textNode);
    textNode.appendChild(nameNode);
    let br = document.createElement("br");
    textNode.appendChild(br);
    textNode.appendChild(priceNode);
    br = document.createElement("br");
    textNode.appendChild(br);
    textNode.appendChild(cityNode);
    br = document.createElement("br");
    textNode.appendChild(br);
    textNode.appendChild(dateNode);
    br = document.createElement("br");
    textNode.appendChild(br);
    textNode.appendChild(authorNode);
    flexbox.appendChild(node);
    checkTheme();
};
let postNum =1;

//myStorage.clear();


const posts = [];
const priceOf=(price)=>{
    price=price.toString().reverse;
    price=price.split('');
    for(let x=0;x<price.length;x++){
        if (x%3===2){
           price[x]+=' '
        }
    }
    return price.toString().replace(/,/g,'').reverse+' ₽'
};
let createPost = (item)=> {
    const post = item;
    post.id=item.id;
    postNum++;
    post.title = item.title;
    post.date = item.date;
    post.city = item.city;
    post.price = item.price;
    post.photo = item.photo;
    let date = new Date();
    if (post.date === '') {
        if (date.getMinutes().toString().length === 2) {
            post.date = 'Сегодня ' + date.getHours() + ' : ' + date.getMinutes();
        } else {
            post.date = 'Сегодня ' + date.getHours() + ' :  0' + date.getMinutes();
        }
    }
    post.isLiked=item.isLiked;
    post.type=item.type;
    date = null;
    publishPost(post)
};
let createNewPost = (item)=> {
    const post = item;
    post.isLiked=false;
    post.id=posts.findIndex(x=>x.title===item.title&&x.price===item.price);
    postNum++;
    post.title = item.title;
    post.city = 'Moscow';
    post.price = item.price;
    post.photo = item.pictures[0];
    let date = new Date();
    if (post.date === ''||post.date === undefined) {
        if (date.getMinutes().toString().length === 2) {
            post.date = 'Сегодня ' + date.getHours() + ' : ' + date.getMinutes();
        } else {
            post.date = 'Сегодня ' + date.getHours() + ' :  0' + date.getMinutes();
        }
    }
    post.type=item.category;
    date = null;
    posts.splice(posts.findIndex(x=>x.id===post.id),1,post);
    publishPost(post)
};
let showFavor = () =>{
    onFav = true;
    clearFeed();
    for (let x=0;x<favorIndex;x++){
        const item =JSON.parse(myStorage.getItem('favor'+x));
      //  console.log(item);
        createPost(item)
    }

};

function clearFeed() {
    let lngth= document.getElementsByClassName('item').length;

    for (let y=0;y<lngth;y++){
        document.getElementsByClassName('item')[0].parentElement.removeChild(document.getElementsByClassName('item')[0])
    }
}
/*
for (let x=0 ;x<8;x++){
    createNewPost('Avtamabil','Moskva','500000','./imgs/autonews2-tnnw.jpg','Auto','')
}
*/
function checkTheme() {
    if (myStorage.getItem('darkMode')==='false'||myStorage.getItem('darkMode')===null) {
        toLight()
    }
    else {
        toDark()
    }
}
checkTheme();

