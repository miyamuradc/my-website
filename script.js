let isLogin = false;

function switchMode() {
  isLogin = !isLogin;
  document.getElementById("form-title").innerText = isLogin ? "Login" : "Signup";
  document.querySelector("button").innerText = isLogin ? "Login" : "Signup";
  document.getElementById("switch-text").innerHTML = isLogin
    ? `Don't have an account? <a href="#" onclick="switchMode()">Signup</a>`
    : `Already have an account? <a href="#" onclick="switchMode()">Login</a>`;
  document.getElementById("status").innerText = "";
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
    // ✅ Show Dashboard
    showDashboard(username);
  } else {
    if (users[username]) {
      status.innerText = "Username already exists.";
      return;
    }
    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));
    status.innerText = "Signup successful! You can now login.";
  }

  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}

function showDashboard(username) {
  const dashboardHTML = `
    <div class="container">
      <h1>Welcome, ${username} 🜲</h1>
      <p>This is your dashboard.</p>
      <button onclick="logout()">Logout</button>
    </div>
  `;
  document.body.innerHTML = dashboardHTML;
}

function logout() {
  location.reload();
}
