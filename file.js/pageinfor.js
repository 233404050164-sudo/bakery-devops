const querystring = window.location.search;
const urlparams = new URLSearchParams(querystring);

const cakename = urlparams.get('name');
const cakeimg =  urlparams.get('img');
const cakeprice = urlparams.get('price');

const nameelement = document.querySelector('.name-cake');
const imgelement = document.querySelector('#img-inform');
const priceelement = document.querySelector('.price-cake');

if(cakename){
    nameelement.textContent = cakename;
}

if(cakeimg){
    imgelement.src = cakeimg;
    imgelement.alt = cakename;
}

if(cakeprice){
    priceelement.textContent = cakeprice;
}

const shoplink = document.querySelector('#add-shop');
if(shoplink && cakename &&cakeimg && cakeprice){
    shoplink.href = `pageshop.html?name=${encodeURIComponent(cakename)}
    &img=${encodeURIComponent(cakeimg)}
    &price=${encodeURIComponent(cakeprice)}`;
}
