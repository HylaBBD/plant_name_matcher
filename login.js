const loginForm = document.getElementById("login-form");

async function login(event) {
  event.preventDefault(); // Prevent form submission from reloading the page

  console.log("abc");
  try {
    const response = await fetch("http://localhost:8000/user?username=pickOne");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

loginForm.addEventListener("submit", login);
