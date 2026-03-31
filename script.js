const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: form.name.value,
    phone: form.phone.value,
    email: form.email.value,
    message: form.message.value
  };

  try {
    const res = await fetch("/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.success) {
      alert("Message Sent ✅");
      form.reset();
    } else {
      alert("Server error ❌");
    }

  } catch (err) {
    console.error(err);
    alert("Error connecting server ❌");
  }
});