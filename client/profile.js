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
  userService.login(); //
}

darkModeSwitch.addEventListener("change", switchTheme, false);
// END OF DARK MODE - - - - - - - - - - - - - - -
