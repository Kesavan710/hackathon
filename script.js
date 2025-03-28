const API_BASE_URL = "http://127.0.0.1:8000"; 

function toggleForms() {
    document.getElementById("loginForm").classList.toggle("hidden");
    document.getElementById("signupForm").classList.toggle("hidden");
}

async function signup() {
    let name = document.getElementById("signupName").value.trim();
    let email = document.getElementById("signupEmail").value.trim();
    let password = document.getElementById("signupPassword").value.trim();

    if (!name || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        let response = await fetch(`${API_BASE_URL}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        let data = await response.json();
        if (response.ok) {
            alert("Signup successful! Please login.");
            toggleForms();
        } else {
            alert(data.detail || "Signup failed!");
        }
    } catch (error) {
        console.error("Signup error:", error);
        alert("Error signing up. Please try again.");
    }
}

async function login() {
    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        let response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        let data = await response.json();
        if (response.ok) {
            alert("Login successful!");
            localStorage.setItem("user_id", data.user_id); // Store user ID for session
            document.getElementById("authContainer").classList.add("hidden");
            document.getElementById("transportContainer").classList.remove("hidden");
        } else {
            alert(data.detail || "Invalid credentials.");
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("Error logging in. Please try again.");
    }
}

async function submitTransport() {
    let user_id = localStorage.getItem("user_id");
    let transportMode = document.getElementById("transportMode").value;
    let distance = Math.floor(Math.random() * 10) + 1; // Random distance for demo

    if (!user_id) {
        alert("User not logged in!");
        return;
    }

    try {
        let response = await fetch(`${API_BASE_URL}/transport`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id, transport_type: transportMode, distance })
        });

        let data = await response.json();
        if (response.ok) {
            alert(`Transport data saved! You traveled ${distance} km by ${transportMode}.`);
        } else {
            alert(data.detail || "Error saving transport data.");
        }
    } catch (error) {
        console.error("Transport submission error:", error);
        alert("Error submitting transport data.");
    }
}
