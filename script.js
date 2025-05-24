let isLogin = false;

function switchMode() {
  isLogin = !isLogin;
  document.getElementById("form-title").innerText = isLogin ? "Login" : "Signup";
  document.querySelector("button").innerText = isLogin ? "Login" : "Signup";
  document.getElementById("switch-text").innerHTML = isLogin
    ? `Don't have an account? <a href="#" onclick="switchMode()">Signup</a>`
    : `Already have an account? <a href="#" onclick="switchMode()">Login</a>`;
  document.getElementById("status").innerText = "";
  clearInputs();
}

function clearInputs() {
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}

function handleAction() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const status = document.getElementById("status");

  if (!username || !password) {
    status.innerText = "Please fill in both fields.";
    return;
  }

  if (username.length < 3) {
    status.innerText = "Username must be at least 3 characters.";
    return;
  }

  if (password.length < 6) {
    status.innerText = "Password must be at least 6 characters.";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (isLogin) {
    if (!users[username]) {
      status.innerText = "User does not exist.";
      return;
    }

    if (users[username] !== password) {
      status.innerText = "Incorrect password.";
      return;
    }

    // ✅ SUCCESSFUL LOGIN —> Show Dashboard
    showDashboard(username);
  } else {
    if (users[username]) {
      status.innerText = "Username already exists.";
      return;
    }

    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));
    status.innerText = "Signup successful! You can now log in.";
  }

  clearInputs();
}

function showDashboard(username) {
  document.body.innerHTML = `
    <style>
      body {
        font-family: 'Segoe UI', sans-serif;
        background: linear-gradient(120deg, #89f7fe, #66a6ff);
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
      }

      .dashboard {
        background: white;
        padding: 30px 40px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        width: 360px;
        text-align: center;
        animation: fadeIn 0.6s ease-in;
      }

      .dashboard h1 {
        margin-bottom: 20px;
      }

      button {
        padding: 10px 25px;
        background: #007bff;
        color: white;
        border: none;
        font-size: 1rem;
        border-radius: 7px;
        cursor: pointer;
        margin-top: 10px;
        transition: background 0.3s;
      }

      button:hover {
        background: #0056b3;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    </style>

    <div class="dashboard">
      <h1>Welcome, ${username} 🜲</h1>
      <p>You have successfully logged in.</p>
      <button onclick="logout()">Logout</button>
    </div>
  `;
}

function logout() {
  location.reload();
}
