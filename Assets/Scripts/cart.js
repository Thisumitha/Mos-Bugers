export let cart = [];

export const  loaddata = ()=>{
    // get data cart from memory
    if(localStorage.getItem('cart')){
       cart = JSON.parse(localStorage.getItem('cart'));
       addCartToHTML();
       }
}
export const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}
export function addToMyArray(item) {
    myArray.push(item);
  }



