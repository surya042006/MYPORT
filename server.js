require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve frontend (same folder)
app.use(express.static(__dirname));

// ✅ Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ✅ MySQL connection
const db = mysql.createConnection({
  host: "localhost",      // ⚠️ change for Render later
  user: "root",
  password: "Surya@123",  // your password
  database: "portfolio"
});

db.connect(err => {
  if (err) {
    console.log("MySQL Error ❌", err);
  } else {
    console.log("MySQL Connected ✅");
  }
});

// ✅ API route
app.post("/add", (req, res) => {
  const { name, phone, email, message } = req.body;

  if (!name || !phone || !email || !message) {
    return res.status(400).json({ success: false });
  }

  const sql = "INSERT INTO contacts (name, phone, email, message) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, phone, email, message], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ success: false });
    }

    res.json({ success: true });
  });
});

// ✅ Start server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running 🚀`);
});