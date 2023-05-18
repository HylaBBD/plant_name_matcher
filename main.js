// DARK MODE - - - - - - - - - - - - - - - - - - -
const currentMode = localStorage.getItem('theme');

if (currentMode) {
    document.documentElement.setAttribute('dark-mode', currentMode);
}
// END OF DARK MODE - - - - - - - - - - - - - - -

// MENU HAMBURGER - - - - - - - - - - - - - - - -
let menuToggleButton = document.getElementsByClassName("menu-toggle")[0];
let headerNav = document.getElementsByClassName("header-nav")[0];
if (menuToggleButton != null) {
    menuToggleButton.addEventListener("click", function () {
        if (headerNav != null) {
            headerNav.classList.toggle("active");
        }
    });
}
// END OF MENU HAMBURGER - - - - - - - - - - - - 

// CHANGE HEADER ON SCREEN RESIZE 
let winWidth = window.matchMedia("(max-width: 370px)");
smallWidth(winWidth);
winWidth.addEventListener('change', smallWidth);

function smallWidth(winWidth) {
    if (winWidth.matches) {
        document.querySelector("#bb-title").innerHTML = "BB";
    }else{        
        document.querySelector("#bb-title").innerHTML = "Botanical Buzzwords";
    }
}