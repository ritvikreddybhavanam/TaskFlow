import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAlOgVjdqvo-cOfP66EluDpGkAVh9ylzAE",
    authDomain: "taskflow-java-project.firebaseapp.com",
    projectId: "taskflow-java-project",
    storageBucket: "taskflow-java-project.firebasestorage.app",
    messagingSenderId: "453407324132",
    appId: "1:453407324132:web:96cc0bc320b4c1787679f1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
    const resetForm = document.getElementById("resetForm");
    const resetBtn = document.getElementById("resetBtn");

    resetForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;

        // Start Loading State
        resetBtn.classList.add("loading");
        resetBtn.disabled = true;

        try {
            // 1. Setup the 1-second delay
            const delay = new Promise(resolve => setTimeout(resolve, 1000));

            // 2. Wait for Firebase AND the delay
            // Note: Modern Firebase might not throw error if email is missing
            await Promise.all([
                sendPasswordResetEmail(auth, email),
                delay
            ]);

            // 3. This MUST run if the above finishes without throwing
            alert("Password Reset Link to sent to email check spam.. Redirecting to Login Page");

            // 4. Force Redirect
            window.location.replace("LoginPage.html");

        } catch (error) {
            // Reset UI on error
            resetBtn.classList.remove("loading");
            resetBtn.disabled = false;

            console.error("Firebase Error:", error.code, error.message);

            if (error.code === "auth/invalid-email") {
                alert("Please enter a valid email address.");
            } else if (error.code === "auth/too-many-requests") {
                alert("Too many requests. Please try again later.");
            } else {
                alert("An error occurred. Please try again.");
            }
        }
    });
});

// Back Button Fix
window.addEventListener("pageshow", (event) => {
    const resetBtn = document.getElementById("resetBtn");
    const form = document.getElementById("resetForm");
    if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
        if (resetBtn) {
            resetBtn.classList.remove("loading");
            resetBtn.disabled = false;
        }
        if (form) form.reset();
    }
});