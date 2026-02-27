const loginBtn = document.getElementById("loginBtn");
const message = document.getElementById("message");
const usernameInput = document.getElementById("user");
const passwordInput = document.getElementById("pass");

// Attach event listener
loginBtn.addEventListener("click", login);

function showMessage(text, color) {
  message.textContent = text;
  message.style.color = color;
}

function resetBtn() {
  loginBtn.textContent = "Login";
  loginBtn.disabled = false;
}

async function login() {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!username || !password) {
    showMessage("Please fill in all fields", "#ffae00");
    return;
  }

  loginBtn.textContent = "Authenticating...";
  loginBtn.disabled = true;

  try {
    // Simulated authentication (replace this with real API call)
    // If you already have Netlify function, you can use fetch
    // For demo, we just check username/password manually
    if (username === "admin" && password === "1234") {
      sessionStorage.setItem("user", username);
      showMessage("Access Granted ✓ Redirecting...", "#00ffcc");

      setTimeout(() => {
        window.location.href = "index.html"; // Redirect to dashboard
      }, 1000);
    } else {
      showMessage("Invalid username or password", "#ff4a4a");
      resetBtn();
    }

  } catch (err) {
    showMessage("Server error", "#ff4d6d");
    resetBtn();
  }
}
