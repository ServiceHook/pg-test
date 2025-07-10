export default function handler(req, res) {
  const status = req.body.STATUS;
  const amount = req.body.TXN_AMOUNT;

  if (status === 'TXN_SUCCESS') {
    res.send(`
      <html>
        <body style="text-align:center;font-family:sans-serif;">
          <h2>✅ Payment Successful</h2>
          <p>Thank you for buying me coffee ☕</p>
          <p>Amount: ₹${amount}</p>
          <p>Redirecting back...</p>
          <script>
            setTimeout(() => window.location.href = '/', 5000);
          </script>
        </body>
      </html>
    `);
  } else {
    res.send("❌ Payment Failed");
  }
}

