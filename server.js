require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Surya@123",
  database: "portfolio"
});

db.connect(err => {
  if (err) console.log("DB Error ❌", err);
  else console.log("MySQL Connected ✅");
});

// API
app.post("/add", (req, res) => {
  const { name, phone, email, message } = req.body;

  const sql = "INSERT INTO contacts (name, phone, email, message) VALUES (?, ?, ?, ?)";
  
  db.query(sql, [name, phone, email, message], (err) => {
    if (err) return res.json({ success: false });
    res.json({ success: true });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running 🚀"));