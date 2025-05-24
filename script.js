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
    <div class="container animate">
      <h1>Welcome, ${username}!</h1>
      <p>You are now logged in.</p>
      <button onclick="logout()">Logout</button>
    </div>
  `;
}

function logout() {
  location.reload();
}
