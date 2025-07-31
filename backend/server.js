const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const path = require('path');

const app = express();
const PORT = 5000;

// ✅ Serve static files from 'frontend' directory
app.use(express.static(path.join(__dirname, 'frontend')));

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ MySQL DB Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234', // 🔁 Replace with your MySQL password
  database: 'student_counseling'
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection error:", err);
  } else {
    console.log("✅ Connected to MySQL database: student_counseling");
  }
});

// ✅ Student Form Submission Route
app.post("/submit-student", (req, res) => {
  const {
    fullName,
    dob,
    phone,
    email,
    math10,
    science10,
    english10,
    hindi10,
    physics12,
    chemistry12,
    math12,
    branch_pref1,
    branch_pref2
  } = req.body;

  const sql = `INSERT INTO student_details 
    (fullName, dob, phone, email, hs_math, hs_science, hs_english, hs_hindi, twophysics, twochemistry, twomath, branch_pref1, branch_pref2) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    fullName,
    dob,
    phone,
    email,
    math10,
    science10,
    english10,
    hindi10,
    physics12,
    chemistry12,
    math12,
    branch_pref1,
    branch_pref2
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("❌ DB Insert Error:", err);
      res.status(500).json({ message: "Database error" });
    } else {
      console.log("✅ Student data inserted:", result.insertId);
      res.json({ message: "Success" });
    }
  });
});

// ✅ Student Login Route
app.post('/student-login', (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM student_users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error("❌ Login Query Error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length > 0) {
      console.log("✅ Login success for:", email);
      res.json({ message: "Login successful" });
    } else {
      console.log("❌ Invalid login for:", email);
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
});

// ✅ Ranked students (sorted by total marks)
app.get("/ranked-students", (req, res) => {
  const sql = `
    SELECT fullName, email, phone,
           twophysics + twochemistry + twomath AS total_12_marks,
           branch_pref1, branch_pref2
    FROM student_details
    ORDER BY total_12_marks DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error fetching rankings:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json(results);
  });
});

// ✅ NEW: Unsorted student list (all student records)
app.get("/students", (req, res) => {
  const sql = `
    SELECT fullName, email, phone,
           twophysics + twochemistry + twomath AS total_12_marks,
           branch_pref1, branch_pref2
    FROM student_details
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error fetching student list:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json(results);
  });
});

// ✅ Default Route to Index (optional)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'student-login.html'));
});

// ✅ Handle 404 (file not found)
app.use((req, res) => {
  res.status(404).send("❌ Page Not Found");
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
// ✅ Save Allocated Branch for a student
app.post("/allocate-branch", (req, res) => {
  const { email, allocated_branch } = req.body;

  if (!email || !allocated_branch) {
    return res.status(400).json({ message: "Missing email or branch" });
  }

  const sql = "UPDATE student_details SET allocated_branch = ? WHERE email = ?";

  db.query(sql, [allocated_branch, email], (err, result) => {
    if (err) {
      console.error("❌ DB allocation error:", err);
      return res.status(500).json({ message: "Database error during allocation" });
    }

    console.log(`✅ Branch "${allocated_branch}" allocated to ${email}`);
    res.json({ message: "Branch allocated successfully" });
  });
});

