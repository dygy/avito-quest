myStorage = localStorage;
let favorIndex;
if (myStorage.getItem('favorIndex')===undefined||myStorage.getItem('favorIndex')===null){
    myStorage.setItem('favorIndex',0);
    favorIndex=0
}else {
    favorIndex = myStorage.getItem('favorIndex')
}
if (myStorage.getItem('darkMode')==='false') {
    toDark()
}
else {
    toLight()
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

const addToFavor=(param)=>{

    const post = posts[param.path[0].className[param.path[0].className.length-1]];
    console.log(param);
    if (post.isLiked===false) {
        post.isLiked= favorIndex;
        myStorage.setItem('favor' + favorIndex, JSON.stringify(post));
        // console.log(param.path[0].className[(param.path[0].className.length-1)]);
        // console.log(myStorage.getItem('favor'+favorIndex));
        favorIndex++;
        myStorage.setItem('favorIndex', favorIndex);
        setTimeout(()=>{param.path[0].className= 'liked '+param.path[0].className},500)
    }
    else {
        console.log(param.path[0].className)
        post.isLiked=false;
        myStorage.removeItem('favor'+post.isLiked);
        param.path[0].className=param.path[0].className.replace(/liked/,'')

    }
};
const publishPost=(post)=>{
    const node = document.createElement("div");                 // Create a <li> node
    node.className = 'item ' + post.type;
    node.alt = '';
    const symbolNode = document.createElement('i');
    if (post.isLiked) {
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
    nameNode.innerText = post.name;
    const cityNode = document.createElement('span');
    cityNode.innerText = post.city;
    const dateNode = document.createElement('date');
    dateNode.innerText = post.date;

    // Create a text node

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

    flexbox.appendChild(node);     // Append <li> to <ul> with id="myList"
};
let postNum =1;


const Post = class {
    name='';
    date='';
    price='';
    photo='';
    city='';
    type='';
    id;
    isLiked
};
const posts = [];

let createPost = (name, city, price, photo, type, dates,id,isLiked)=> {
    const post = new Post();
    post.id=id;
    postNum++;
    post.name = name;
    post.date = dates;
    post.city = city;
    post.price = price;
    post.photo = photo;
    let date = new Date();
    if (post.date === '') {
        if (date.getMinutes().toString().length === 2) {
            post.date = 'Сегодня ' + date.getHours() + ' : ' + date.getMinutes();
        } else {
            post.date = 'Сегодня ' + date.getHours() + ' :  0' + date.getMinutes();
        }
    }
    post.isLiked=isLiked;
    post.type=type;
    date = null;
    publishPost(post)
};
let createNewPost = (name, city, price, photo, type, dates)=> {
    const post = new Post();
    post.isLiked=false;
    post.id=postNum;
    postNum++;
    post.name = name;
    post.date = dates;
    post.city = city;
    post.price = price;
    post.photo = photo;
    let date = new Date();
    if (post.date === '') {
        if (date.getMinutes().toString().length === 2) {
            post.date = 'Сегодня ' + date.getHours() + ' : ' + date.getMinutes();
        } else {
            post.date = 'Сегодня ' + date.getHours() + ' :  0' + date.getMinutes();
        }
    }
    post.type=type;
    posts.push(post);
    date = null;
    publishPost(post)
};
let showFavor = () =>{
    let lngth= document.getElementsByClassName('item').length;
    for (let y=0;y<lngth;y++){
        document.getElementsByClassName('item')[0].parentElement.removeChild(document.getElementsByClassName('item')[0])
    }
    for (let x=0;x<favorIndex;x++){
        const item =JSON.parse(myStorage.getItem('favor'+x));
        console.log(item);
        createPost(item.name,item.city,item.price,item.photo,item.type,item.date,item.id,item.isLiked)
    }
};

for (let x=0 ;x<8;x++){
    createNewPost('Avtamabil','Moskva','700 000 ₽','./imgs/autonews2-tnnw.jpg','Auto','')
}