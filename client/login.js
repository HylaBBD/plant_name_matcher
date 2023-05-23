import { userService } from "./services/user.service.js";

const loginForm = document.getElementById("login-form");
const errorText = document.getElementById("login-error-text");
const userName = document.getElementsById("user-name");
const userPassword = document.getElementsById("user-password");

async function login(event) {
  event.preventDefault(); // Prevent form submission from reloading the page

  console.log("abc");
  try {
    const response = await userService.login(userName.innerText, userPassword.innerText); // user35
    const data = await response.json();
    localStorage.setItem('userId', data.user.userId);
    errorText.innerText = "";

  } catch (error) {
    console.log(error);
    errorText.innerText = "Invalid login details";
  }
}

loginForm.addEventListener("submit", login);