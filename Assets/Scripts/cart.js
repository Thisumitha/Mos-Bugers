let listCartHTML  = document.querySelector('.order-item');
let total =document.querySelector('.total')
let iconCartSpan = document.querySelector('.icon-cart span');
let dis = document.querySelector('.discount');
let net = document.querySelector('.netTotal');
let fnlbill = document.querySelector('.price');
let name =document.getElementById('name');
let number =document.getElementById('contact');
let placeOrder =document.querySelector('.placeOrder')

import {allitems} from './stock.js';





let cart =[];

export const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    let billval =  0 ;
    let discount= 0 ;
    if(cart.length > 0){
        cart.forEach(item => {
            totalQuantity = totalQuantity +  item.quantity;
            let newItem = document.createElement('div');   
            newItem.dataset.id = item.product_id;
            let positionProduct = allitems.findIndex((value) => value.itemCode == item.product_id);
            let info = allitems[positionProduct];
             billval = billval + (info.price * item.quantity);
             discount= discount +((info.price * item.quantity)*(info.discount/100));
            
            newItem.innerHTML = `
            <div class="card rounded-3  ">
            <div class="card-body p-3">
              <div class="row d-flex  align-items-center">
                <div class="col-md-2 col-lg-2 col-xl-2">
                  <img src="${info.Image}" class="img-fluid rounded-3" alt="Cotton T-shirt">
                </div>
                <div class="col-md-3 col-lg-2 col-xl-3">
                  <p class="lead fw-normal mb-2">  ${info.itemName}</p>

                </div>
                <div class="col-md-3 col-lg-2 col-xl-3 ">
                <div class="quantity">
                <span class="minus"><</span>
                <span>${item.quantity}</span>
                <span class="plus">></span>
            </div>
                </div>
                <div class="col-md-3 col-lg-3 col-xl-3 ">
                <div class="totalPrice">RS:${info.price * item.quantity}.00</div>
                </div>
                <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                  <a href="#!"><img class="fa-trash" src="../Assets/Delete.png" alt="bin"></i></a>
                </div>
              </div>
            </div>
          </div>
            `;
            listCartHTML.appendChild(newItem);
        })
        
        
    }
    let netToatal =billval-discount;
    iconCartSpan.innerText = (totalQuantity+" items");
    total.innerText=("RS :"+billval+".00");
    dis.innerText=("RS :"+discount+".00");
    net.innerText=("RS :"+netToatal+".00");
    fnlbill.innerText=("RS :"+netToatal+".00");
}
listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
})
const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.itemCode == product_id);
    if(positionItemInCart >= 0){
        let info = cart[positionItemInCart];
        switch (type){
            case('plus'):
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
        
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                }else{
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
   
}






const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export const  loaddata = ()=>{
    
    if(localStorage.getItem('cart')){
       cart = JSON.parse(localStorage.getItem('cart'));
       addCartToHTML();
       
       }
}
loaddata();