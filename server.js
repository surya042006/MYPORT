const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 Serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Surya@123",
  database: "portfolio"
});

db.connect((err) => {
  if (err) {
    console.log("DB Error ❌", err);
  } else {
    console.log("MySQL Connected ✅");
  }
});

// API
app.post("/add", (req, res) => {
  const { name, phone, email, message } = req.body;

  const sql = "INSERT INTO contacts (name, phone, email, message) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, phone, email, message], (err) => {
    if (err) {
      console.log(err);
      res.json({ success: false });
    } else {
      res.json({ success: true });
    }
  });
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000 🚀");
});