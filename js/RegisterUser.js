import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

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
    const registerForm = document.getElementById("registerForm");
    const registerBtn = document.getElementById("registerBtn");
    const passwordField = document.getElementById("password");

    if (!registerForm || !registerBtn) return;

    // Disable copy/paste/cut on password
    ["copy", "paste", "cut"].forEach(evt => {
        passwordField.addEventListener(evt, (e) => {
            e.preventDefault();
            alert(`You cannot ${evt} in the password field`);
        });
    });

    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const fullname = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value;
        const password = passwordField.value;

        // Name Validation
        const nameRegex = /^[A-Za-z]{2,}(?: [A-Za-z]{2,})*$/;
        if (!nameRegex.test(fullname)) {
            alert("Please enter a valid Full Name (at least 2 characters per name).");
            return;
        }

        // 1. Show Loading State
        registerBtn.classList.add("loading");
        registerBtn.disabled = true;

        try {
            // 2. Firebase logic
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: fullname,
            })

            await sendEmailVerification(user);

            alert("Account created! Please check your inbox (and spam) to verify your email before logging in.");
            window.location.replace("LoginPage.html");

        } catch (error) {
            // 3. Reset UI on failure
            registerBtn.classList.remove("loading");
            registerBtn.disabled = false;

            console.error("Auth Error:", error.code);
            switch (error.code) {
                case "auth/email-already-in-use":
                    alert("This email is already registered.");
                    break;
                case "auth/weak-password":
                    alert("Password must be at least 6 characters.");
                    break;
                case "auth/invalid-email":
                    alert("Invalid email format.");
                    break;
                default:
                    alert("Registration failed: " + error.message);
            }
        }
    });
});

// Fix for browser back-button caching
window.addEventListener("pageshow", (event) => {
    const registerBtn = document.getElementById("registerBtn");
    if (registerBtn) {
        registerBtn.classList.remove("loading");
        registerBtn.disabled = false;
    }
});