import { auth } from './config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { serverTimestamp, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import * as Calendar from './calendar.js';
import * as DB from './database.js';

// Initialization
window.addEventListener("load", Calendar.initGoogleAPIs);

// --- State & Selectors ---
let currentEditingId = null;
const popup = document.getElementById("popup");
const taskInput = document.querySelector(".task-input");
// ... (Add all your other selectors here)

// --- Helper: Close Popup ---
const closePopup = () => {
    popup.classList.remove("show");
    setTimeout(() => {
        popup.style.display = "none";
        // Reset form...
        currentEditingId = null;
    }, 300);
};

// --- Add/Update Task Flow ---
document.querySelector(".add-task-btn")?.addEventListener("click", async () => {
    const user = auth.currentUser;
    // Get values from inputs...

    try {
        if (currentEditingId) {
            const taskData = await DB.getTask(currentEditingId);
            // Update logic...
            if (taskData?.calendarEventId && Calendar.gapiInited) {
                const hasAccess = await Calendar.ensureGoogleAccess(user.email);
                if (hasAccess) await Calendar.updateCalendarEvent(taskData.calendarEventId, title, description, dateValue, timeValue);
            }
            await DB.updateTask(currentEditingId, { /* update fields */ });
        } else {
            // New task logic...
            let eventId = null;
            const hasAccess = await Calendar.ensureGoogleAccess(user.email);
            if (hasAccess) eventId = await Calendar.createCalendarEvent(title, description, dateValue, timeValue);

            await DB.saveTask({ /* task fields */, calendarEventId: eventId });
        }
        closePopup();
    } catch (e) { console.error(e); }
});

// --- Auth State Listener ---
onAuthStateChanged(auth, (user) => {
    if (!user) return;
    // Handle UI rendering and Task Loading...
});