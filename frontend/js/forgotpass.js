const container = document.querySelector(".container");
const registerBtn = document.querySelector(".register-btn");
const loginBtn = document.querySelector(".login-btn");

// registerBtn.addEventListener("click", () => {
//   container.classList.add("active");
// });

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});
const forget = document.getElementById("loginform");

forget.addEventListener("submit", forgetfum);

const url = "http://127.0.0.1:5500/EnterEmail";

async function forgetfum(e) {
  e.preventDefault();

  const email = e.target.email.value;
  const option = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email }),
  };
  const response = await fetch(url, option);
  const { message, status } = await response.json();
  //   alert(message);
  if (status === 404) {
    container.classList.remove("active");
    return alert(message);
  } else if (status === 200) {
    container.classList.add("active");
    // alert(message);
  }

  if (email === "") {
    alert("The form is empty");
  }
  // window.location.replace(
  //   window.location.href.replace(
  // "frontend/html/forgot.html",
  // "frontend/html/code&newpass.html"
  //   )
  // );
}
