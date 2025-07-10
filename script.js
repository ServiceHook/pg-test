document.getElementById('coffeeBtn').onclick = () => {
  document.getElementById('coffeeForm').classList.remove('hidden');
};

document.getElementById('coffeeForm').onsubmit = async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = {
    name: form.name.value,
    phone: form.phone.value,
    email: form.email.value,
    amount: form.amount.value
  };

  const res = await fetch('/api/initiate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const html = await res.text();
  const win = window.open();
  win.document.write(html);
};
