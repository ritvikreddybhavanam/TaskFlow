import { auth, db } from './config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { serverTimestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import * as Calendar from './calendar.js';
import * as DB from './database.js';

// --- Global State ---
let allTasks = [];
let currentFilter = 'today';
let currentEditingId = null;

// --- DOM Elements ---
const filterToday = document.getElementById('filter-today');
const filterUpcoming = document.getElementById("filter-upcoming");
const filterCompleted = document.getElementById("filter-completed");
const filterTitle = document.getElementById("current-filter-title");

const popup = document.getElementById("popup");
const addTaskIcon = document.getElementById("addtask");
const closeBtn = document.getElementById("close");
const taskInput = document.querySelector(".task-input");
const descInput = document.getElementById("description");
const dateInput = document.querySelector(".due-date");
const timeInput = document.getElementById("appt");
const submitBtn = document.querySelector(".add-task-btn");
const taskContainer = document.getElementById("task-container");
const userDisplay = document.getElementById("user-display-name");

// --- 1. Path Helper for Redirects ---
const getLoginPath = () => {
    // This prevents the "html/html" doubling by using the absolute origin
    return window.location.origin + "/html/AuthenticationPages/LoginPage.html";
};

// --- 2. Filtering & Rendering Logic ---
const applyFiltersRender = () => {
    const todayStr = new Date().toLocaleDateString('en-CA');

    let filtered = allTasks.filter(task => {
        if (currentFilter === 'completed') return task.completed === true;
        if (task.completed) return false; // Hide completed from Today/Upcoming

        if (currentFilter === 'today') return task.dueDate === todayStr;
        if (currentFilter === 'upcoming') return task.dueDate > todayStr;
        return true;
    });

    renderTasks(filtered);
};

const renderTasks = (tasks) => {
    if (!tasks || tasks.length === 0) {
        taskContainer.innerHTML = `
            <div class="no-tasks">
                <span class="material-symbols-outlined">task_alt</span>
                <p>No tasks found.</p>
            </div>`;
        return;
    }

    taskContainer.innerHTML = tasks.map(task => `
        <div class="task-tile">
            <div class="task-check" data-id="${task.id}">
                <span class="material-symbols-outlined check-icon">
                    ${task.completed ? 'check_circle' : 'radio_button_unchecked'}
                </span>
            </div>
            <div class="task-content">
                <h3 class="${task.completed ? 'strikethrough' : ''}">${task.title}</h3>
                <div class="task-date">
                    <span class="material-symbols-outlined" style="font-size:16px;">calendar_today</span>
                    ${task.dueDate} @ ${task.time || 'All Day'}
                </div>
            </div>
            <div class="task-actions">
                <span class="material-symbols-outlined edit-btn" data-id="${task.id}">edit</span>
                <span class="material-symbols-outlined delete-btn" data-id="${task.id}">delete</span>
            </div>
        </div>
    `).join('');

    attachListeners();
};

const attachListeners = () => {
    // Delete
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.onclick = async (e) => {
            const id = e.currentTarget.dataset.id;
            if (confirm("Delete this task?")) {
                const task = await DB.getTask(id);
                if (task?.calendarEventId) await Calendar.deleteCalendarEvent(task.calendarEventId);
                await DB.deleteTask(id);
            }
        };
    });

    // Edit
    document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.onclick = async (e) => {
            const task = await DB.getTask(e.currentTarget.dataset.id);
            if (task) {
                currentEditingId = task.id;
                taskInput.value = task.title;
                descInput.value = task.description || "";
                dateInput.value = task.dueDate;
                timeInput.value = task.time || "";
                submitBtn.textContent = "Update Task";
                openPopup();
            }
        };
    });

    // Toggle Complete
    document.querySelectorAll(".task-check").forEach(btn => {
        btn.onclick = async (e) => {
            const id = e.currentTarget.dataset.id;
            const task = allTasks.find(t => t.id === id);
            if (task) await DB.updateTask(id, { completed: !task.completed });
        };
    });
};

// --- 3. Navigation & Popup ---
const switchTab = (tabName, element, title) => {
    currentFilter = tabName;
    [filterToday, filterUpcoming, filterCompleted].forEach(el => el?.classList.remove('active'));
    element?.classList.add('active');
    if (filterTitle) filterTitle.textContent = title;
    applyFiltersRender();
};

filterToday?.addEventListener('click', () => switchTab('today', filterToday, "Today's Tasks"));
filterUpcoming?.addEventListener('click', () => switchTab('upcoming', filterUpcoming, "Upcoming Tasks"));
filterCompleted?.addEventListener('click', () => switchTab('completed', filterCompleted, "Completed Tasks"));

const openPopup = () => {
    popup.style.display = "flex";
    setTimeout(() => popup.classList.add("show"), 10);
};

const closePopup = () => {
    popup.classList.remove("show");
    setTimeout(() => {
        popup.style.display = "none";
        resetForm();
    }, 300);
};

const resetForm = () => {
    taskInput.value = ""; descInput.value = ""; dateInput.value = ""; timeInput.value = "";
    currentEditingId = null;
    submitBtn.textContent = "Add Task";
};

addTaskIcon?.addEventListener("click", openPopup);
closeBtn?.addEventListener("click", closePopup);

// --- 4. Form Submission (Firebase + Calendar) ---
submitBtn?.addEventListener("click", async () => {
    const user = auth.currentUser;
    if (!user || !taskInput.value || !dateInput.value) return alert("Please fill required fields");

    submitBtn.disabled = true;
    try {
        let calId = null;

        // Sync with Google Calendar
        if (Calendar.gapiInited) {
            const hasAccess = await Calendar.ensureGoogleAccess(user.email);
            if (hasAccess) {
                if (currentEditingId) {
                    const oldTask = await DB.getTask(currentEditingId);
                    if (oldTask?.calendarEventId) {
                        await Calendar.updateCalendarEvent(oldTask.calendarEventId, taskInput.value, descInput.value, dateInput.value, timeInput.value);
                        calId = oldTask.calendarEventId;
                    }
                } else {
                    calId = await Calendar.createCalendarEvent(taskInput.value, descInput.value, dateInput.value, timeInput.value);
                }
            }
        }

        const taskData = {
            title: taskInput.value,
            description: descInput.value,
            dueDate: dateInput.value,
            time: timeInput.value,
            calendarEventId: calId,
            updatedAt: serverTimestamp()
        };

        if (currentEditingId) {
            await DB.updateTask(currentEditingId, taskData);
        } else {
            await DB.saveTask({
                ...taskData,
                userId: user.uid,
                completed: false,
                createdAt: serverTimestamp()
            });
        }
        closePopup();
    } catch (e) {
        console.error("Task Save Error:", e);
    } finally {
        submitBtn.disabled = false;
    }
});

// --- 5. Auth & Init ---
window.addEventListener("load", () => {
    if (Calendar.initGoogleAPIs) Calendar.initGoogleAPIs();
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        if (userDisplay) userDisplay.textContent = user.displayName || user.email.split('@')[0];
        DB.subscribeToTasks(user.uid, (tasks) => {
            allTasks = tasks;
            applyFiltersRender();
        });
    } else {
        window.location.replace(getLoginPath());
    }
});

document.getElementById("logout")?.addEventListener("click", async () => {
    await signOut(auth);
    window.location.replace(getLoginPath());
});