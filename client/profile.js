import { userService } from "./services/user.service.js";

// DARK MODE - - - - - - - - - - - - - - - - - - -
const darkModeSwitch = document.querySelector(
  '.dark-mode-switch input[type="checkbox"]'
);
const currentMode = localStorage.getItem("theme");

if (currentMode) {
  document.documentElement.setAttribute("dark-mode", currentMode);
  if (darkModeSwitch != null && currentMode === "dark") {
    darkModeSwitch.checked = true;
  }
}

// FAVOURITE PLANTS
let favouritePlantImages = document.getElementsByClassName("favourite-plants-image");
let favouritePlantCaptions = document.getElementsByClassName("favourite-plants-caption");

let userFavouritePlants = await userService.getUserFavouritePlant(localStorage.getItem("userId"));
let userFavouritePlantIDs = userFavouritePlants.map((favouritePlant) => {return favouritePlant.id});

for(let i = 0; i < 3; i++){
  if(i < userFavouritePlants.length){
    favouritePlantImages[i].src = userFavouritePlants[i].defaultImage.original_url;
    favouritePlantCaptions[i].innerText = userFavouritePlants[i].scientificName;
  }
}

let userHighScoreText = document.getElementById("user-high-score");
let userHighScore = await userService.getUserScoreAndRank(localStorage.getItem("userId")).score;
if(userHighScore == undefined){
  userHighScoreText.innerText = 0;
}else{
  userHighScoreText.innerText = userHighScore;
}

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("dark-mode", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("dark-mode", "light");
    localStorage.setItem("theme", "light");
  }
}

function login() {
  userService.login();
}

let logoutButton = document.getElementById("logout-button");
logoutButton.addEventListener("click", () => logout());

function logout(){
  localStorage.removeItem("userId");
  window.location.href = "login.html";
}
darkModeSwitch.addEventListener("change", switchTheme, false);
// END OF DARK MODE - - - - - - - - - - - - - - -
