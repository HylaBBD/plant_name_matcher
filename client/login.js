import { userService } from "./services/user.service.js";

const loginForm = document.getElementById("login-form");
const errorText = document.getElementById("login-error-text");
const userName = document.getElementById("user-name");
const userPassword = document.getElementById("user-password");


// LOADING SCREEN - - - - - - - - - - - - 
const loadingSection = document.getElementById("loading-screen");
const loadingSectionImage = document.getElementById("loading-screen-image")

function displayLoadingScreen() {
    loadingSection.classList.add("display");
}
function hideLoadingScreen() {
    loadingSection.classList.remove("display");
}

async function login(event) {
  displayLoadingScreen();

  event.preventDefault(); // Prevent form submission from reloading the page
  console.log("abc");
  if(userName.value != "" && userPassword.value != ""){
    try {
      console.log(userName.value);
      console.log(userPassword.value);

      const response = await userService.login(userName.value, userPassword.value); // user35
      const data = await response.json();
      localStorage.setItem('userId', data.user.userId);
      errorText.innerText = "";
      window.location.href = "game.html";
    } catch (error) {
        console.log(error);
        errorText.innerText = "Invalid login details.";
        hideLoadingScreen();
    }
  }else{
    errorText.innerText = "Please fill in all fields.";
    hideLoadingScreen();
  }
}

loginForm.addEventListener("submit", login);