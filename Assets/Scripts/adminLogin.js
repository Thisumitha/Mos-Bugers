let username = document.getElementById("Username");
let password = document.getElementById("password");
let submit =document.querySelector('.login');

let url="https://www.youtube.com/watch?v=HZ6nbgxl5j8";
submit.addEventListener('click', (event) => {
    let positionClick = event.target;
        if(positionClick.classList.contains('login')){
            if ((username.value === "admin")||( password.value ==="admin")){
                alert("Login Success");
                
                location.replace("http://www.google.com");
             
            }
        }
})