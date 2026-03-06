import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

export const firebaseConfig = {
    apiKey: "AIzaSyAlOgVjdqvo-cOfP66EluDpGkAVh9ylzAE",
    authDomain: "taskflow-java-project.firebaseapp.com",
    projectId: "taskflow-java-project",
    storageBucket: "taskflow-java-project.firebasestorage.app",
    messagingSenderId: "453407324132",
    appId: "1:453407324132:web:96cc0bc320b4c1787679f1"
};

export const CLIENT_ID = "298410190888-r48dtjp3aes9jihp52ai1hnc669u8nqt.apps.googleusercontent.com";
export const API_KEY = "AIzaSyDT3AvjxOEx0MPRS8UkgYVDqjS7pX6KEcA";
export const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
export const SCOPES = "https://www.googleapis.com/auth/calendar";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);