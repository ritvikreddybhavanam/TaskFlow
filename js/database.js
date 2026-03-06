import { db } from './config.js';
import { collection, addDoc, doc, deleteDoc, updateDoc, getDoc, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

export const tasksRef = collection(db, "tasks");

export async function getTask(taskId) {
    const snap = await getDoc(doc(db, "tasks", taskId));
    return snap.exists() ? snap.data() : null;
}

export async function saveTask(taskData) {
    return await addDoc(tasksRef, taskData);
}

export async function updateTask(taskId, updateData) {
    return await updateDoc(doc(db, "tasks", taskId), updateData);
}

export async function deleteTask(taskId) {
    return await deleteDoc(doc(db, "tasks", taskId));
}