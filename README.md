<h1 align="center">🎓 Student Counseling Web Application</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/Database-MySQL-blue?style=for-the-badge&logo=mysql" />
  <img src="https://img.shields.io/badge/Frontend-HTML/CSS/JS-orange?style=for-the-badge&logo=html5" />
</p>

> A full-stack student counseling system to streamline the admission process — from student registration, ranking, manual seat allotment, fee verification, to final offer letter generation.

---

## ✨ Features

### 👨‍🎓 **Student Module**
- 🔐 Sign up and Log in
- 📝 Submit academic details (10th & 12th marks)
- 💡 Select two preferred branches
- 🧾 View allocated branch after admin approval
- ✅ Accept/reject branch offer
- 📤 Upload payment receipt
- 📄 Download final **Offer Letter** (after verification)

### 🧑‍💼 **Admin Module**
- 📊 View all student records
- 🏆 Rank students by total 12th marks
- 🎯 Allocate branches manually based on preferences
- 🔍 Verify uploaded fee receipts
- 🧾 Generate and share final **Offer Letter**

---

## 🛠 Tech Stack

| Layer        | Technologies |
|--------------|--------------|
| 💻 Frontend  | HTML, CSS, JavaScript |
| ⚙️ Backend   | Node.js + Express |
| 🗄️ Database | MySQL |
| 🗃️ Storage  | Local File System (or Firebase optional) |
| 📦 Others    | GitHub, PDFKit (optional), Firebase (optional) |

---

## 🗂️ Folder Structure

```bash
student-counseling-app/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── uploads/             # Bank receipts
├── frontend/
│   ├── student-login.html
│   ├── student-dashboard.html
│   ├── admin-dashboard.html
│   └── css/style.css
└── README.md


🚀 Getting Started
🧾 Prerequisites
Node.js & npm
MySQL Server



📦 Install Backend Dependencies
bash
Copy
Edit
cd backend
npm install



⚙️ Set Up MySQL Database
sql
Copy
Edit
CREATE DATABASE student_counseling;

-- Create the student_details table:
CREATE TABLE student_details (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullName VARCHAR(100),
  dob DATE,
  phone VARCHAR(20),
  email VARCHAR(100),
  hs_math INT,
  hs_science INT,
  hs_english INT,
  hs_hindi INT,
  twophysics INT,
  twochemistry INT,
  twomath INT,
  branch_pref1 VARCHAR(100),
  branch_pref2 VARCHAR(100),
  allocated_branch VARCHAR(100),
  receipt_path VARCHAR(255),
  is_verified BOOLEAN DEFAULT false
);



▶️ Start the Server
bash
Copy
Edit
node server.js
Server will run on: http://localhost:5000



👨‍💻 Author
Mohammad Kasim
DevOps Engineer | Full Stack Developer
📬 Hashnode • GitHub

📄 License
Licensed under the MIT License







