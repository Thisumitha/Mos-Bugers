let name =document.getElementById('name');
let number =document.getElementById('contact');
let search = document.getElementById("search");
let newCustomer = document.querySelector(".newCus");
let searchbtn = document.querySelector(".searchbtn");

let customers = [];
let searchbox = search.value;


let customerList = document.querySelector(".customerList");


function initApp() {
    customers.forEach((customer, key) => {
    let newRow = document.createElement('tr');

    newRow.innerHTML = `
    <tr>
    <td>${customer.name}</td>
    <td>${customer.number}</td>
    </tr>
    `;

    customerList.appendChild(newRow);
  });
}




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

 const loaddata = () => {
  if (localStorage.getItem("customers")) {
    customers = JSON.parse(localStorage.getItem("customers"));
  }
};

loaddata();
console.log(customers);
initApp();