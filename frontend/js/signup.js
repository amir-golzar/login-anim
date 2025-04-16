const form = document.getElementById("dale");

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
  const result = await response.json();
  alert(result.message);

  if ((data.name == "", data.email == "", data.password == "")) {
    alert("form ra por konid");
    return;
  }
console.log(window.location);
  window.location.replace(
    window.location.href.replace("frontend/html/index.html","frontend/html/home.html")
  );
});
