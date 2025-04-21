const login = document.getElementById("loginform");

login.addEventListener("submit", submit);

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const url = "http://127.0.0.1:5500/sing";

async function submit(e) {
  e.preventDefault();

  const email = e.target.email.value;
  const password = e.target.password.value;

  const data = { email, password };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const { message, token } = await response.json();
  alert(message);
  console.log(token);

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
