module.exports = async (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send(`
    <html>
      <head>
        <meta http-equiv="refresh" content="5;url=/" />
        <style>
          body {
            background: #0f0f0f;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: sans-serif;
            height: 100vh;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div>
          <h1>✅ Your coffee has been delivered to me!</h1>
          <p>Redirecting to homepage...</p>
        </div>
      </body>
    </html>
  `);
};
