// --- LOGIN CHECK ---
if (!sessionStorage.getItem("user")) {
    window.location.replace("loginwasher.html");
}

// Display current user
const currentUserEl = document.createElement("div");
currentUserEl.style.position = "fixed";
currentUserEl.style.top = "20px";
currentUserEl.style.right = "20px";
currentUserEl.style.background = "rgba(37,99,235,0.9)";
currentUserEl.style.color = "#fff";
currentUserEl.style.padding = "8px 14px";
currentUserEl.style.borderRadius = "8px";
currentUserEl.style.fontWeight = "500";
currentUserEl.innerText = `Logged in as: ${sessionStorage.getItem("user")}`;
document.body.appendChild(currentUserEl);

// --- LOGOUT ---
function logout() {
    sessionStorage.clear();
    showToast("Logged out successfully");
    setTimeout(() => { window.location = "loginwasher.html"; }, 800);
}

// --- CUSTOMERS DATA ---
let customers = JSON.parse(localStorage.getItem("customers")) || [];

// Save customers to localStorage
function saveCustomers() {
    localStorage.setItem("customers", JSON.stringify(customers));
}

// Add new customer
function addCustomer() {
    let name = document.getElementById("name").value.trim();
    let room = document.getElementById("room").value.trim();
    if (!name || !room) { 
        showToast("Please fill all fields"); 
        return; 
    }

    customers.push({ id: Date.now(), name, room, status: "Pending", paid: false });
    document.getElementById("name").value = "";
    document.getElementById("room").value = "";
    saveCustomers();
    loadCustomers();
    showToast("Customer added successfully");
}

// Change customer status
function changeStatus(index) {
    const states = ["Pending", "Washing", "Ready"];
    let current = states.indexOf(customers[index].status);
    customers[index].status = states[(current + 1) % 3];
    saveCustomers();
    loadCustomers();
    showToast(`Status changed to ${customers[index].status}`);
}

// Toggle payment
function togglePayment(index) {
    customers[index].paid = !customers[index].paid;
    saveCustomers();
    loadCustomers();
    showToast(customers[index].paid ? "Marked as Paid" : "Marked as Unpaid");
}

// Delete customer (stuff only admin can do)
function deleteCustomer(index) {
    customers.splice(index, 1);
    saveCustomers();
    loadCustomers();
    showToast("Customer deleted");
}

// Load customers to dashboard
function loadCustomers() {
    const list = document.getElementById("customerList");
    list.innerHTML = "";
    const role = sessionStorage.getItem("role");

    customers.forEach((c, i) => {
        const deleteBtn = role === "admin" ? `<button onclick="deleteCustomer(${i})">Delete</button>` : "";
        list.innerHTML += `
        <div class="customer">
            <b>${c.name}</b> - Room ${c.room}<br>
            Status: ${c.status}<br>
            Payment: <span class="${c.paid ? "paid" : "unpaid"}">${c.paid ? "Paid" : "Unpaid"}</span><br>
            <button onclick="changeStatus(${i})">Change Status</button>
            <button onclick="togglePayment(${i})">Toggle Payment</button>
            ${deleteBtn}
        </div>
        `;
    });

    document.getElementById("totalCustomers").innerText = customers.length;
    updateStats();
}

// Update stats cards
function updateStats() {
    document.getElementById("readyCount").innerText = customers.filter(c => c.status === "Ready").length;
    document.getElementById("paidCount").innerText = customers.filter(c => c.paid).length;
}

// Search functionality
function searchCustomer() {
    let search = document.getElementById("search").value.toLowerCase();
    document.querySelectorAll(".customer").forEach(card => {
        card.style.display = card.innerText.toLowerCase().includes(search) ? "block" : "none";
    });
}

// Show toast messages
function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.innerText = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
}

// Initial load
loadCustomers();
