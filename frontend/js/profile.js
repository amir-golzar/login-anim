const logo = document.getElementById("logo");

const url = "http://127.0.0.1:5500/corokodil";

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
  return "";
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
    });
  info();
}

logo.addEventListener("click", jkjk);
function info(e) {
  const cart = document.createElement("div");
  cart.classList.add("cart");
  

  document.body.appendChild(cart);
  console.log(cart);
  logo.removeEventListener("click", jkjk);
  logo.addEventListener("click", function (e) {
    cart.remove();
    logo.addEventListener("click", jkjk);
    logo.removeEventListener("click", this);
  });
}
