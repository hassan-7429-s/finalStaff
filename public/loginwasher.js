// Get stored accounts
let staffAccounts = JSON.parse(localStorage.getItem("staffAccounts")) || [];

// Redirect to signup if no accounts exist
if (staffAccounts.length === 0) {
    window.location.replace("signup.html");
}

function login() {
    let username = document.getElementById("user").value.trim();
    let password = document.getElementById("pass").value.trim();

    if (!username || !password) {
        alert("Enter username and password");
        return;
    }

    const valid = staffAccounts.find(
        acc => acc.user === username && acc.pass === password
    );

    if (valid) {
        // Save session
        sessionStorage.setItem("user", valid.user);
        sessionStorage.setItem("role", valid.role);

        // IMPORTANT: use replace (prevents going back)
        window.location.replace("index.html");
    } else {
        alert("Invalid username or password!");
    }
}
