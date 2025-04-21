window.addEventListener("DOMContentLoaded", (e) => {
  let token = getCookie("tokenjwt");
  if (!token) {
    console.log(23);
    window.location.replace(
      window.location.href.replace(
        "frontend/html/home.html",
        "frontend/html/index.html"
      )
    );
    return;
  }
});

const logo = document.getElementById("logo");

const url = "http://127.0.0.1:5500/profile";

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}

function jkjk(e) {
  let token = getCookie("tokenjwt");
  const option = {
    method: "GET",
    headers: {
      authorization: token,
    },
  };
  fetch(url, option)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      info(data.name, data.email);
    })
    .catch();
}

logo.addEventListener("click", jkjk);
function info(name, email) {
  const cart = document.createElement("div");
  cart.classList.add("cart");

  const namee = document.createElement("div");
  namee.innerText = `your user name is : ${name}`;
  namee.classList.add("uname");
  const emaill = document.createElement("div");
  emaill.innerText = `your email is : ${email}`;
  emaill.classList.add("uname");

  cart.appendChild(namee);
  cart.appendChild(emaill);
  document.body.appendChild(cart);
  console.log(cart);
  logo.removeEventListener("click", jkjk);
  logo.addEventListener("click", function (e) {
    cart.remove();
    logo.addEventListener("click", jkjk);
    logo.removeEventListener("click", this);
  });
}
