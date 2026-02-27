let staffAccounts = JSON.parse(localStorage.getItem("staffAccounts")) || [];

function signup() {
    let name = document.getElementById("name").value.trim();
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    let code = document.getElementById("code").value.trim();

    if (!name || !username || !password) {
        alert("Please fill all required fields");
        return;
    }

    // Check if username exists
    if (staffAccounts.find(acc => acc.user === username)) {
        alert("Username already exists!");
        return;
    }

    // Determine role
    let role = staffAccounts.length === 0 ? "admin" : (code === "MASTERADMIN123" ? "admin" : "staff");

    staffAccounts.push({ name, user: username, pass: password, role });
    localStorage.setItem("staffAccounts", JSON.stringify(staffAccounts));
    alert(`Account created! Your role: ${role}`);
    window.location = "loginwasher.html";
}

feather.replace(); // Renders icons for new buttons dynamically
