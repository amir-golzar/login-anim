const form = document.getElementById("dale");


function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("dsfaddsf");

  const name = e.target.name.value;
  console.log(name);

  const email = e.target.email.value;
  const password = e.target.password.value;

  const data = { name, email, password };

  const response = await fetch("http://127.0.0.1:5500/sing", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const { message, token } = await response.json();
  alert(message);
  console.log(token);
  setCookie("tokenjwt", token, 30);

  if ((data.name == "", data.email == "", data.password == "")) {
    alert("form ra por konid");
    return;
  }
  console.log(window.location);
  window.location.replace(
    window.location.href.replace(
      "frontend/html/index.html",
      "frontend/html/home.html"
    )
  );
});

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  if (passwordRegex.test(password)) {
    alert("پسورد معتبر است!");
  } else {
    let error = "";
    if (password.length < 8) {
      error += "پسورد باید حداقل 8 کاراکتر داشته باشد. ";
    }
    if (!/[a-z]/.test(password)) {
      error += "پسورد باید حداقل یک حرف کوچک داشته باشد. ";
    }
    if (!/[A-Z]/.test(password)) {
      error += "پسورد باید حداقل یک حرف بزرگ داشته باشد. ";
    }
    if (!/\d/.test(password)) {
      error += "پسورد باید حداقل یک عدد داشته باشد. ";
    }
    errorMessage.textContent = error;
  }