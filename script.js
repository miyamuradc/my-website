let isLogin = false;

function switchMode() {
  isLogin = !isLogin;
  document.getElementById("form-title").innerText = isLogin ? "Login" : "Signup";
  document.querySelector("button").innerText = isLogin ? "Login" : "Signup";
  document.getElementById("switch-text").innerHTML = isLogin
    ? `Don't have an account? <a href="#" onclick="switchMode()">Signup</a>`
    : `Already have an account? <a href="#" onclick="switchMode()">Login</a>`;
  document.getElementById("status").innerText = "";
}

function handleAction() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
    document.getElementById("status").innerText = "Please enter both fields.";
    return;
  }

  if (isLogin) {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      document.getElementById("status").innerText = "No user found. Please signup first.";
    } else {
      const { savedUsername, savedPassword } = JSON.parse(storedUser);
      if (username === savedUsername && password === savedPassword) {
        document.getElementById("status").innerText = "Login successful!";
      } else {
        document.getElementById("status").innerText = "Incorrect username or password.";
      }
    }
  } else {
    localStorage.setItem("user", JSON.stringify({ savedUsername: username, savedPassword: password }));
    document.getElementById("status").innerText = "Signup successful! You can now log in.";
  }
}
