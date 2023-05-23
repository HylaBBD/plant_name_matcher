import { userService } from "./services/user.service.js";

const singupForm = document.getElementById("signup-form");
const errorText = document.getElementById("signup-error-text");
const userName = document.getElementsById("user-name");
const userPassword1 = document.getElementsById("user-password1");
const userPassword2 = document.getElementsById("user-password2");

async function signup(event) {
  console.log("abcdasdfasdf");
  event.preventDefault(); // Prevent form submission from reloading the page

  console.log("abc");

  if(userPassword1.innerText == userPassword2.innerText){
    try {
      const response = await userService.register(userName.innerText, userPassword1.innerText);
      console.log(response);
      const data = await response.json();
  
      console.log(data);
      errorText.innerText = "Successfully registered. Please login.";
  
    } catch (error) {
      console.log(error);
      errorText.innerText = "Invalid login details";
    }
  }else{
    errorText.innerText = "Please ensure the passwords are identical.";
  }
}

singupForm.addEventListener("submit", signup);