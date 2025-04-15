
const form = document.getElementById("dale");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const data = { name, email, password };

  const response = await fetch("http://127.0.01:5500/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  alert(result.message);

  if ((data.name == "", data.email == "", data.password == "")) {
    alert("form ra por konid");
    return;
  }
});
