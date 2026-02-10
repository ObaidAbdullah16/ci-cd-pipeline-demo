const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Home route
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>CI/CD Pipeline Demo</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: #0d1117;
          color: #c9d1d9;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          margin: 0;
        }
        .container {
          text-align: center;
          padding: 40px;
          border: 1px solid #30363d;
          border-radius: 10px;
          background: #161b22;
          max-width: 500px;
        }
        h1 { color: #58a6ff; }
        p { color: #8b949e; line-height: 1.6; }
        .badge {
          background: #238636;
          color: white;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 14px;
          display: inline-block;
          margin-top: 15px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚀 CI/CD Pipeline Demo</h1>
        <p>This app is automatically built and deployed using GitHub Actions.</p>
        <p>Build → Push → Deploy</p>
        <span class="badge">✅ Pipeline Active</span>
      </div>
    </body>
    </html>
  `);
});

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
