 import {burgers} from './stock.js';




let list=document.querySelector('.items');

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
        <button onclick="addToCart(${key}) type="button" class="btn btn-danger   btn-block "
                      data-mdb-ripple-color="dark"> add to cart </button>
        </div>`;
        list.appendChild(newDiv);
    })
}
initApp();