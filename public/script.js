document.getElementById("payBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const amount = document.getElementById("amount").value;

  if (!name || !phone || !amount) {
    alert("Please fill all required fields");
    return;
  }

  const res = await fetch("/api/initiate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, phone, amount })
  });

  const data = await res.json();

  if (data.success) {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://securegw-stage.paytm.in/order/process";

    Object.keys(data.body).forEach(key => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = data.body[key];
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  } else {
    alert("Something went wrong!");
  }
});
