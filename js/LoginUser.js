import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

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
    const form = document.getElementById("loginForm");
    const loginBtn = document.getElementById("loginBtn");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Start Loading State
        loginBtn.classList.add("loading");
        loginBtn.disabled = true;

        try {
            // sign in
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // check if email is verified
            if (!user.emailVerified) {
                alert("Please verify your email before logging in. Check spam of your mail");
                loginBtn.classList.remove("loading");
                loginBtn.disabled = false;
                return;
            }

            const delay = new Promise(resolve => setTimeout(resolve, 1000));

            // Success redirect to Dashboard (Up one level from AuthenticationPages)
            window.location.replace("../Dashboard.html");

        } catch (error) {
            // Reset UI on error
            loginBtn.classList.remove("loading");
            loginBtn.disabled = false;

            const errorCode = error.code;
            if (errorCode === "auth/invalid-credential" ||
                errorCode === "auth/user-not-found" ||
                error.message.includes("invalid-login-credentials")) {
                alert("Invalid email or password.");
            } else if (errorCode === "auth/too-many-requests") {
                alert("Too many failed attempts. Try again later.");
            } else {
                alert("Error: " + error.message);
            }
        }
    });
});

// Fix for Back Button: Reset form and button state when user returns to page
window.addEventListener("pageshow", (event) => {
    const loginBtn = document.getElementById("loginBtn");
    const form = document.getElementById("loginForm");
    if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
        if (loginBtn) {
            loginBtn.classList.remove("loading");
            loginBtn.disabled = false;
        }
        if (form) form.reset();
    }
});