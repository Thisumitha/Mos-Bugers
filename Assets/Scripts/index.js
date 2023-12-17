 import {burgers} from './stock.js';
 import { cart } from './cart.js';


let listCard = document.querySelector('.listCard');
let list=document.querySelector('.items');
let quantity = document.querySelector('.quantity');

let listCards =[];

function initApp(){
    burgers.forEach((value,key)=>{
        let newDiv =document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML =`
        <div class="">
        <img src="${value.Image}"/>
        <div class="title ">${value.itemName}</div>
        <div class="price">item code :${value.itemCode}</div>
        <div class="price"> Discount : ${value.discount} %</div>
        <div class="price">RS : ${value.price}.00</div>
        <button onclick="addToCart("${value.itemCode}")" type="button" class="btn btn-danger   btn-block "
                      data-mdb-ripple-color="dark"> add to cart </button>
        </div>`;
      list.appendChild(newDiv);
    })
}
initApp();
function addToCart(itemCode){
    // listCards.push(itemCode);
    // reloadCard();
    alert(itemCode.toLocaleString);
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.Image}"/></div>
                <div>${value.itemName}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}