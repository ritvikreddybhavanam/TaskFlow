import { auth } from './config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

/**
 * Initializes the authentication listener.
 * @param {Function} onUserAvailable - Callback function to run when a user logs in.
 */
export function initAuth(onUserAvailable) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("User is signed in:", user.email);

            // Update Sidebar UI
            const userText = document.querySelector(".user p");
            if (userText) {
                userText.textContent = user.displayName || user.email.split('@')[0];
            }

            // Trigger the task loading logic in main.js
            if (onUserAvailable) onUserAvailable(user);
        } else {
            console.log("No user signed in. Redirecting...");
            // Redirect to login page if not authenticated
            window.location.replace("AuthenticationPages/LoginPage.html");
        }
    });
}

/**
 * Handles the logout process.
 */
export async function handleLogout() {
    try {
        await signOut(auth);
        window.location.replace("AuthenticationPages/LoginPage.html");
    } catch (error) {
        console.error("Logout failed:", error);
        alert("Error signing out.");
    }
}

// Attach logout event listener if the button exists
document.getElementById("logout")?.addEventListener("click", handleLogout);