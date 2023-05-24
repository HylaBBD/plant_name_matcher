import { userService } from "./services/user.service.js";

// LOADING SCREEN - - - - - - - - - - - - 
const loadingSection = document.getElementById("loading-screen");
const loadingSectionImage = document.getElementById("loading-screen-image")

function displayLoadingScreen() {
    loadingSection.classList.add("display");
}
function hideLoadingScreen() {
    loadingSection.classList.remove("display");
}

const singupForm = document.getElementById("signup-form");
const errorText = document.getElementById("signup-error-text");
const userName = document.getElementById("user-name");
const userPassword1 = document.getElementById("user-password1");
const userPassword2 = document.getElementById("user-password2");

function isValidPassword(password) {
  let specialChars =/[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/;
  if(specialChars.test(password)){
    return false;
  }
  return true;
}

function containsLetters(password) {
  let letterChars = /[A-Za-z\s]/;
  if(letterChars.test(password)){
    return true;
  }
  return false;
}

async function signup(event) {
  displayLoadingScreen();

  errorText.innerText = "";
  event.preventDefault(); // Prevent form submission from reloading the page
  if(userName.value == "" || userPassword1.value == "" || userPassword2.value == ""){
    errorText.innerText = "Please fill in all fields.";
  }else if(!containsLetters(userName.value)){
    errorText.innerText = "Username must contains some letters.";
  }else if(!isValidPassword(userName.value)){
    errorText.innerText = "Username can only contains letters and numbers.";
  }else if(userPassword1.value != userPassword2.value){
    errorText.innerText = "Please ensure the passwords are identical.";
  }else if(!containsLetters(userPassword1.value)){
    errorText.innerText = "Password must contains some letters.";
  }else if(!isValidPassword(userPassword1.value)){
    errorText.innerText = "Password can only contains letters and numbers.";
  }
  else{
    try {
      const response = await userService.register(userName.value, userPassword1.value);
      const data = await response.json();
      errorText.innerText = "Successfully registered. Please login.";
    } catch (error) {
      errorText.innerText = "Invalid login details.";
    }
  }
  hideLoadingScreen();
}

singupForm.addEventListener("submit", signup);