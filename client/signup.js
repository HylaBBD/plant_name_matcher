import { userService } from "./services/user.service.js";

const singupForm = document.getElementById("signup-form");
const errorText = document.getElementById("signup-error-text");
const userName = document.getElementById("user-name");
const userPassword1 = document.getElementById("user-password1");
const userPassword2 = document.getElementById("user-password2");

async function signup(event) {
  event.preventDefault(); // Prevent form submission from reloading the page
  if(userName.value != "" && userPassword1.value != "" && userPassword2.value != ""){
    if(userPassword1.value == userPassword2.value){
      try {
        console.log(userName.value);
        console.log(userPassword1.value);
        const response = await userService.register(userName.value, userPassword1.value);
        const data = await response.json();
        errorText.innerText = "Successfully registered. Please login.";
      } catch (error) {
        errorText.innerText = "Invalid login details";
      }
    }else{
      errorText.innerText = "Please ensure the passwords are identical.";
    }
  }else{
    errorText.innerText = "Please fill in all fields.";
  }

}

singupForm.addEventListener("submit", signup);