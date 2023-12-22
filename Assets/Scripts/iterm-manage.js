import { allitems } from './stock.js';
let search = document.getElementById("search");
let searchbtn = document.querySelector(".searchbtn");

let listCartHTML = document.querySelector(".itemlist");

initApp();

searchbtn.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains("searchbtn")) {
    
    listCartHTML.innerHTML = "";
    allitems.forEach((item) => {
      if (item.itemCode == search.value) {
        let newRow = document.createElement('tr');
        console.log(search.value);
        newRow.innerHTML = `
        <tr>
          <th>${item.itemCode}</th>
          <td>${item.itemName}</td>
          <td>${item.category}</td>
          <td>${item.price}</td>
          <td>${item.discount}</td>
          <td>2023/12/18</td>
          <td><a href="#!"><img class="fa-trash" src="../Assets/Delete.png" alt="bin"></i></a></td>
        </tr>
        `;
        
        listCartHTML.appendChild(newRow);
      }
    });
    if(search.value==""){
      initApp();
    }
  }
});



function initApp() {
  allitems.forEach((item, key) => {
    let newRow = document.createElement('tr');

    newRow.innerHTML = `
    <tr>
      <th>${item.itemCode}</th>
      <td>${item.itemName}</td>
      <td>${item.category}</td>
      <td>${item.price}</td>
      <td>${item.discount}</td>
      <td>2023/12/18</td>
      <td><a href="#!"><img class="fa-trash" src="../Assets/Delete.png" alt="bin"></i></a></td>
    </tr>
    `;

    listCartHTML.appendChild(newRow);
  });
}




