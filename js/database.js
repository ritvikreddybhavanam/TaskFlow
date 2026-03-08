import { db } from './config.js';
import {
    collection, addDoc, doc, deleteDoc, updateDoc, getDoc, query, where, onSnapshot, orderBy
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

export const tasksRef = collection(db, "tasks");

/**
 * 1. FIX: Added the missing subscribeToTasks function.
 * This listens for real-time updates and sorts tasks by date.
 */
export function subscribeToTasks(userId, callback) {
    // This query REQUIRES a composite index in Firebase Console: userId (Asc) + dueDate (Asc)
    const q = query(
        tasksRef,
        where("userId", "==", userId),
        orderBy("dueDate", "asc")
    );

    return onSnapshot(q, (snapshot) => {
        const tasks = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(tasks);
    }, (error) => {
        console.error("Firestore Subscription Error:", error);
    });
}

/**
 * 2. FIX: Ensure getTask returns the ID so Main.js can use it for editing.
 */
export async function getTask(taskId) {
    const snap = await getDoc(doc(db, "tasks", taskId));
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function saveTask(taskData) {
    return await addDoc(tasksRef, taskData);
}

export async function updateTask(taskId, updateData) {
    const taskDoc = doc(db, "tasks", taskId);
    return await updateDoc(taskDoc, updateData);
}

export async function deleteTask(taskId) {
    const taskDoc = doc(db, "tasks", taskId);
    return await deleteDoc(taskDoc);
}