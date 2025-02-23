function joinCommunity() {
    alert("You have joined the community!");
}

function adminLogin() {
    let password = prompt("Enter Super Admin Password:");
    if (password === "admin123") {
        alert("Access Granted!");
        window.location.href = "admin_dashboard.html";  // Redirect to dashboard
    } else {
        alert("Access Denied!");
    }
}
