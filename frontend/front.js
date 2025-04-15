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
  });
});
