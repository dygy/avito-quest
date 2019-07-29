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
const changeColor = (id, color) =>{
    document.getElementById(id).style.color = color
};
let addToFavor=(param)=>{
    console.log(favorIndex);
    myStorage.setItem('favor'+favorIndex,JSON.stringify(posts[param.path[0].className[param.path[0].className.length-1]]));
    // console.log(param.path[0].className[(param.path[0].className.length-1)]);
    // console.log(myStorage.getItem('favor'+favorIndex));
    favorIndex++;
    myStorage.setItem('favorIndex',favorIndex)
};
let publishPost=(post)=>{
    const node = document.createElement("div");                 // Create a <li> node
    node.className = 'item ' + post.type;
    node.alt = '';
    const symbolNode = document.createElement('i');
    symbolNode.className = 'fa fa-heart-o upOnPhoto index' + post.id;
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
const toDarkMode = () =>{
};

const Post = class {
    name='';
    date='';
    price='';
    photo='';
    city='';
    type='';
    id
};
const posts = [];

let createPost = (name, city, price, photo, type, dates,id)=> {
    const post = new Post();
    post.id=id;
    postNum++;
    post.name = name;
    post.date = dates;
    post.city = city;
    post.price = price+' ₽';
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
    date = null;
    publishPost(post)
};
let createNewPost = (name, city, price, photo, type, dates)=> {
    const post = new Post();
    post.id=postNum;
    postNum++;
    post.name = name;
    post.date = dates;
    post.city = city;
    post.price = price+' ₽';
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
for (let x=0 ;x<8;x++){
    createNewPost('Avtamabil','Moskva','700 000','./imgs/autonews2-tnnw.jpg','Auto','')
}

let showFavor = () =>{
    let lngth= document.getElementsByClassName('item').length;
    for (let y=0;y<lngth;y++){
        document.getElementsByClassName('item')[0].parentElement.removeChild(document.getElementsByClassName('item')[0])
    }
    for (let x=0;x<favorIndex;x++){
        const item =JSON.parse(myStorage.getItem('favor'+x));
        console.log(item);
        createPost(item.name,item.circle,item.price,item.photo,item.type,item.date)
    }
};
