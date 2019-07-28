myStorage = localStorage;
console.log(myStorage.getItem('favor'))
const flexbox = document.getElementsByClassName('flexbox')[0]
console.log(flexbox);
const changeColor = (id, color) =>{
    document.getElementById(id).style.color = color
};
document.write(window.innerWidth+' '+window.outerWidth);
const toDarkMode = () =>{

};
const Post = class {
    name='';
    date='';
    price='';
    photo='';
    city='';
    type=''
};
const posts = [];

let createPost = (name, city, price, photo, type)=> {
    const post = new Post();
    post.name = name;
    post.city = city;
    post.price = price+' ₽';
    post.photo = photo;
    let date = new Date();
    if (date.getMinutes().toString().length === 2) {
        post.date = 'Сегодня ' + date.getHours() + ' : ' + date.getMinutes();
    }
    else {
        post.date = 'Сегодня ' + date.getHours() + ' :  0' + date.getMinutes();
    }
    post.type=type;
    posts.push(post);
    date = null;
};
for (let x=0 ;x<8;x++){
    createPost('Avtamabil','Moskva','700 000','./imgs/autonews2-tnnw.jpg','Auto')
}

let addToFavor=(param)=>{
    myStorage.setItem('favor',JSON.stringify(posts[param.path[0].className[param.path[0].className.length-1]]));
    console.log(param.path[0].className[param.path[0].className.length-1]);
    console.log(myStorage.getItem('favor'))
};

for (let x=0;x<posts.length;x++){
    const node = document.createElement("div");                 // Create a <li> node
    node.className ='item '+posts[x].type;
    node.alt='';
    const symbolNode =document.createElement('i');
    symbolNode.className='fa fa-heart-o upOnPhoto index'+x;
    symbolNode.onclick= addToFavor;
    const imgNode =document.createElement('img');
        imgNode.src=posts[x].photo;
        imgNode.style.width='240px';
        imgNode.style.height='150px';
        imgNode.style.zIndex=0;
    const textNode =document.createElement('p');
    const priceNode = document.createElement('strong');
        priceNode.innerText=posts[x].price;
    const nameNode = document.createElement('a');
        nameNode.innerText=posts[x].name;
    const cityNode = document.createElement('span');
        cityNode.innerText=posts[x].city;
    const dateNode = document.createElement('date');
        dateNode.innerText=posts[x].date;

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

}
