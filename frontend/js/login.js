const login = document.getElementById("loginform");

login.addEventListener("submit", submit);

const url = "http://127.0.0.1:5500/profile";

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

async function submit(e) {
  e.preventDefault();

  const email = e.target.email.value;
  const password = e.target.password.value;

  const data = { email, password };

  const option = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, option);

  const { message, token } = await response.json();
  alert(message);
  setCookie("tokenjwt", token, 30);
  if ((email === "", password === "")) {
    alert("form ra por konid");
  }
  window.location.replace(
    window.location.href.replace(
      "frontend/html/index.html",
      "frontend/html/home.html"
    )
  );
}
