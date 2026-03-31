require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ✅ MySQL Connection (Railway)
const db = mysql.createConnection({
  host: "mysql.railway.internal",
  user: "root",
  password: "pftKCDfYZLmafezkTMMsXuJXeeiYwSAj",
  database: "railway",
  port: 3306
});

// Connect DB
db.connect(err => {
  if (err) {
    console.log("❌ DB Error:", err);
  } else {
    console.log("✅ MySQL Connected");
  }
});

// ✅ API Route
app.post("/add", (req, res) => {
  const { name, phone, email, message } = req.body;

  if (!name || !phone || !email || !message) {
    return res.status(400).json({ success: false });
  }

  const sql = "INSERT INTO contacts (name, phone, email, message) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, phone, email, message], (err, result) => {
    if (err) {
      console.log("❌ Insert Error:", err);
      return res.json({ success: false });
    }

    res.json({ success: true });
  });
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});