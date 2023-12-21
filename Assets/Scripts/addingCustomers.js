const name = document.getElementById("name");
const number = document.getElementById("contact");
let search = document.getElementById("search");
let placeOrder = document.querySelector(".placeOrder");
let newCustomer = document.querySelector(".newCus");
let searchbtn = document.querySelector(".searchbtn");

import { addCartToHTML } from "./cart.js";

let customers = [{ name: "test", number: "test" }];
let searchbox = search.value;

placeOrder.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains("placeOrder")) {
    if (place()) {
      alert("Order Placed !");
      createCustomer();
      localStorage.removeItem("cart");
      addCartToHTML();
      window.location.reload();
    }
  }
});

function place() {
  if (name.value.length == 0 || number.value.length == 0) {
    alert("fill customers");
    return false;
  }
  return true;
}
newCustomer.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains("newCus")) {
    if (place()) {
      createCustomer();
    }
  }
});
function createCustomer() {
  if (checkCustomer()) {
    customers.push({ name: name.value, number: number.value });
    addCustomerToMemory();
    console.log(customers);
  }
}
function checkCustomer() {
  customers.forEach((cus) => {
    if (number.value == cus.number) {
      alert("already Customer");
      return false;
        
    }
  });
 
  return true;
}

searchbtn.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains("searchbtn")) {
    customers.forEach((cus) => {
      if (search.value == cus.number) {
        name.value = cus.name;
        number.value = cus.number;
      }
    });
  }
});

const addCustomerToMemory = () => {
  localStorage.setItem("customers", JSON.stringify(customers));
};

export const loaddata = () => {
  if (localStorage.getItem("customers")) {
    customers = JSON.parse(localStorage.getItem("customers"));
  }
};

loaddata();
console.log(customers);
