import { db, isFirebaseConfigured } from "./firebase";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp
} from "firebase/firestore";
import { KEYS, getLocalData, setLocalData } from "./storageService";

export const notificationService = {
  async getNotifications(userId) {
    if (!userId) return [];
    if (isFirebaseConfigured() && db) {
      try {
        const snap = await getDocs(collection(db, "notifications"));
        const all = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        return all
          .filter(n => n.recipientId === userId)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } catch (err) {
        console.warn("Firestore fetch notifications failed, using local:", err);
      }
    }
    const all = getLocalData(KEYS.NOTIFICATIONS) || [];
    return all
      .filter(n => n.recipientId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async createNotification(notifData) {
    const item = {
      recipientId: notifData.recipientId,
      type: notifData.type || "system",
      title: notifData.title || "Campus Notification",
      message: notifData.message,
      relatedResourceId: notifData.relatedResourceId || null,
      relatedRequestId: notifData.relatedRequestId || null,
      read: false,
      createdAt: new Date().toISOString()
    };

    let id = "notif-" + Date.now().toString(36) + Math.random().toString(36).substr(2, 4);

    if (isFirebaseConfigured() && db) {
      try {
        const docRef = await addDoc(collection(db, "notifications"), {
          ...item,
          createdAt: serverTimestamp()
        });
        id = docRef.id;
      } catch (err) {
        console.warn("Firestore add notification failed, using local fallback:", err);
      }
    }

    const all = getLocalData(KEYS.NOTIFICATIONS) || [];
    const saved = { id, ...item };
    all.unshift(saved);
    setLocalData(KEYS.NOTIFICATIONS, all);
    return saved;
  },

  async markAsRead(notificationId, userId) {
    const all = getLocalData(KEYS.NOTIFICATIONS) || [];
    const idx = all.findIndex(n => n.id === notificationId && n.recipientId === userId);
    if (idx !== -1) {
      all[idx].read = true;
      setLocalData(KEYS.NOTIFICATIONS, all);
    }
    return true;
  },

  async markAllAsRead(userId) {
    const all = getLocalData(KEYS.NOTIFICATIONS) || [];
    let updated = false;
    all.forEach(n => {
      if (n.recipientId === userId && !n.read) {
        n.read = true;
        updated = true;
      }
    });
    if (updated) {
      setLocalData(KEYS.NOTIFICATIONS, all);
    }
    return true;
  },

  async deleteNotification(notificationId, userId) {
    const all = getLocalData(KEYS.NOTIFICATIONS) || [];
    const filtered = all.filter(n => !(n.id === notificationId && n.recipientId === userId));
    setLocalData(KEYS.NOTIFICATIONS, filtered);
    return true;
  }
};
