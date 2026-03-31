async function sendData() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const res = await fetch("/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone, email, message })
  });

  const data = await res.json();

  if (data.success) {
    alert("Message Sent ✅");
  } else {
    alert("Error ❌");
  }
}