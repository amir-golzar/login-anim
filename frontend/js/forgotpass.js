const container = document.querySelector(".container");
const registerBtn = document.querySelector(".register-btn");
const loginBtn = document.querySelector(".login-btn");

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});
const forget = document.getElementById("loginform");

forget.addEventListener("submit", forgetfum);

const url = "http://127.0.0.1:5500/EEGP";

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
    container.classList.add("active");
    return alert(message);
  } else if (status === 200) {
    container.classList.add("active");
    // alert(message);
  }

  if (email === "") {
    alert("The form is empty");
  }
}
const form = document.getElementById("dale");

form.addEventListener("submit", update);

const aa = "http://127.0.0.1:5500/updateCode";

async function update(e) {
  e.preventDefault();

  const code = e.target.code.value;
  const password = e.target.password.value;
  // فرض بر این است که یک فیلد ایمیل هم دارید
  const email = document.getElementById("email").value; 

  const data = { code, password, email };

  const option = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(aa, option);
    const { message, status } = await response.json();

    if (status === 200) {
      alert(message);
      window.location.replace(
        window.location.href.replace(
          "frontend/html/forgot.html",
          "frontend/html/index.html"
        )
      );
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
