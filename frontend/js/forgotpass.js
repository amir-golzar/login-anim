const forget = document.getElementById("loginform");

forget.addEventListener("submit", forgetfum);

const url = "http://127.0.0.1:5500/EnterEmail";

async function forgetfum(e) {
  e.preventDefault();
  alert(54);
  const email = e.target.email.value;
  const option = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  const response = fetch(url, option);
  const { message, status } = await response.json();
  alert(message);
  if (status === 404) {
    return alert("users is not find");
  }

  if (email === "") {
    alert("The form is empty");
  }
  window.location.replace(
    window.location.href.replace(
      "frontend/html/index.html",
      "frontend/html/forget.html"
    )
  );
  // POST
}
