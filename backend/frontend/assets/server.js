<!DOCTYPE html>
<html>
<head>
  <title>Admin Sign In</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"></script>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="form-container">
    <h2>Admin Sign In</h2>
    <input type="email" id="adminEmail" placeholder="Email">
    <input type="password" id="adminPassword" placeholder="Password">
    <button onclick="loginWithEmail()">Sign In</button>

    <div>Or</div>

    <button onclick="loginWithGoogle()">Sign in with Google</button>

    <div class="link">
      Don’t have an account? <a href="admin-signup.html">Sign Up</a>
    </div>
  </div>

  <script>
    // ✅ Paste your own Firebase config here:
    const firebaseConfig = {
      apiKey: "AIzaSyCuJXMPe7rYKddQNvYeIFU8xmSaORTmc6A",
      authDomain: "student-counseling-73057.firebaseapp.com",
      projectId: "student-counseling-73057",
      storageBucket: "student-counseling-73057.firebasestorage.app",
      messagingSenderId: "380151533407",
      appId: "1:380151533407:web:4200509ff6b0fe5ed3f0ea"
    };

    // ✅ Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();

    // ✅ Email Login
    function loginWithEmail() {
      const email = document.getElementById("adminEmail").value;
      const password = document.getElementById("adminPassword").value;
      auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          alert("Login successful!");
          window.location.href = "admin-dashboard.html"; // redirect
        })
        .catch((error) => {
          alert("Login failed: " + error.message);
        });
    }

    // ✅ Google Login
    function loginWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider)
        .then((result) => {
          alert("Google login successful!");
          window.location.href = "admin-dashboard.html";
        })
        .catch((error) => {
          alert("Google login failed: " + error.message);
        });
    }
  </script>
</body>
</html>
