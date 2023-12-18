import {beverages} from './stock.js';

let listCartHTML  = document.querySelector('.listCart');
let list=document.querySelector('.items');
let quantity = document.querySelector('.quantity');
let getbtn=document.querySelector('.buy')
let iconCartSpan = document.querySelector('.icon-cart span');

let listCards =[];
let cart =[];

function initApp(){
    beverages.forEach((value,key)=>{
        let newDiv =document.createElement('div');
        newDiv.classList.add('item');
        newDiv.dataset.id=value.itemCode;
        newDiv.innerHTML =`
        
        <img src="${value.Image}"/>
        <div class="title ">${value.itemName+((value.itemName.trim().length < 22)? " <br><br>":" ")}</div>
        <div class="price">item code :${value.itemCode}</div>
        <div class="price">  ${(value.discount>0)?"Discount :"+value.discount+"%":"<br>"}</div>
        <div class="price">RS : ${value.price}.00</div>
        <button  type="button" class="addCart  btn btn-danger  btn-block  "
                     >add to cart</button>
        `;
      list.appendChild(newDiv);
      
    })
    
}
initApp();

 const  loaddata = ()=>{
     // get data cart from memory
     if(localStorage.getItem('cart')){
        cart = JSON.parse(localStorage.getItem('cart'));
        addCartToHTML();
    }
}


//-------------cart------------------------------------
list.addEventListener('click', (event) => {
    let positionClick = event.target;
        if(positionClick.classList.contains('addCart')){
            let id_product = positionClick.parentElement.dataset.id;
            addToCart(id_product);

        }
})
const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if(cart.length <= 0){
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    }else if(positionThisProductInCart < 0){
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    }else{
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    
     addCartToHTML();
     addCartToMemory();
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(cart.length > 0){
        cart.forEach(item => {
            totalQuantity = totalQuantity +  item.quantity;
            let newItem = document.createElement('div');   
            newItem.dataset.id = item.product_id;
            let positionProduct = beverages.findIndex((value) => value.itemCode == item.product_id);
            let info = beverages[positionProduct];
            
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
    iconCartSpan.innerText = totalQuantity;
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
        switch (type) {
            case 'plus':
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

