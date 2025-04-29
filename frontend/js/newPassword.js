const form = document.getElementById("dale");

form.addEventListener("submit", update);

const aa = "http://127.0.0.1:5500/updateCode";

async function update(e) {
  e.preventDefault();

  const code = e.target.code.value;
  const password = e.target.password.value;
  console.log(code, password);

  const data = { code, password };

  const option = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data }),
  };
  const response = await fetch(aa, option);
  const { message, status } = await response.json();

  if (status === 200) {
    alert(message);
  } else if (status === 500) {
    alert(message);
  }
}
