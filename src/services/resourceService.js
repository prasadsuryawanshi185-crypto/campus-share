import { db, isFirebaseConfigured } from "./firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";
import { KEYS, getLocalData, setLocalData, initializeLocalStore } from "./storageService";

initializeLocalStore();

export const resourceService = {
  async getAllResources() {
    if (isFirebaseConfigured() && db) {
      try {
        const q = query(collection(db, "resources"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      } catch (err) {
        console.warn("Firestore fetch failed, falling back to local storage:", err);
      }
    }
    const local = getLocalData(KEYS.RESOURCES) || [];
    return [...local].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async getResourceById(id) {
    if (isFirebaseConfigured() && db) {
      try {
        const docRef = doc(db, "resources", id);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          return { id: snap.id, ...snap.data() };
        }
      } catch (err) {
        console.warn("Firestore fetch by ID failed, falling back to local storage:", err);
      }
    }
    const list = getLocalData(KEYS.RESOURCES) || [];
    return list.find(r => r.id === id) || null;
  },

  async createResource(resourceData, currentUser) {
    if (!currentUser) throw new Error("Authentication required to list a resource.");

    const newResource = {
      title: resourceData.title.trim(),
      category: resourceData.category,
      description: resourceData.description.trim(),
      condition: resourceData.condition,
      sharingType: resourceData.sharingType,
      status: "Available",
      maxDuration: resourceData.maxDuration || "Flexible (Semester / Exam)",
      preferredPickup: resourceData.preferredPickup || "Central Library Entrance",
      department: resourceData.department || currentUser.department,
      academicYear: resourceData.academicYear || currentUser.academicYear,
      ownerId: currentUser.uid,
      ownerName: currentUser.fullName,
      ownerDept: currentUser.department?.split(" ")[0] || "WCE",
      ownerYear: currentUser.academicYear?.split(" ")[0] || "Student",
      imageUrl: resourceData.imageUrl || "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
      tags: resourceData.tags || [],
      viewsCount: 0,
      isFlagged: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (isFirebaseConfigured() && db) {
      try {
        const docRef = await addDoc(collection(db, "resources"), {
          ...newResource,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        return { id: docRef.id, ...newResource };
      } catch (err) {
        console.warn("Firestore addDoc failed, persisting to local storage:", err);
      }
    }

    // Local Storage fallback
    const list = getLocalData(KEYS.RESOURCES) || [];
    const generated = {
      id: "res-" + Date.now().toString(36),
      ...newResource,
    };
    list.unshift(generated);
    setLocalData(KEYS.RESOURCES, list);
    return generated;
  },

  async updateResource(id, updates, currentUser) {
    if (!currentUser) throw new Error("Authentication required to update resource.");

    if (isFirebaseConfigured() && db) {
      try {
        const docRef = doc(db, "resources", id);
        await updateDoc(docRef, {
          ...updates,
          updatedAt: serverTimestamp(),
        });
        return { id, ...updates };
      } catch (err) {
        console.warn("Firestore update failed, falling back to local storage:", err);
      }
    }

    const list = getLocalData(KEYS.RESOURCES) || [];
    const idx = list.findIndex(r => r.id === id);
    if (idx === -1) throw new Error("Resource not found.");

    // Check authorization: Owner or Admin
    if (list[idx].ownerId !== currentUser.uid && currentUser.role !== "admin") {
      throw new Error("Unauthorized to edit this resource.");
    }

    const updated = {
      ...list[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    list[idx] = updated;
    setLocalData(KEYS.RESOURCES, list);
    return updated;
  },

  async deleteResource(id, currentUser) {
    if (!currentUser) throw new Error("Authentication required to delete resource.");

    if (isFirebaseConfigured() && db) {
      try {
        const docRef = doc(db, "resources", id);
        await deleteDoc(docRef);
        return true;
      } catch (err) {
        console.warn("Firestore delete failed, falling back to local storage:", err);
      }
    }

    const list = getLocalData(KEYS.RESOURCES) || [];
    const item = list.find(r => r.id === id);
    if (!item) return false;

    if (item.ownerId !== currentUser.uid && currentUser.role !== "admin") {
      throw new Error("Unauthorized to delete this resource.");
    }

    const filtered = list.filter(r => r.id !== id);
    setLocalData(KEYS.RESOURCES, filtered);
    return true;
  },

  async flagResource(id, reason, currentUser) {
    if (!currentUser) throw new Error("Authentication required to flag resource.");

    const list = getLocalData(KEYS.RESOURCES) || [];
    const idx = list.findIndex(r => r.id === id);
    if (idx !== -1) {
      list[idx].isFlagged = true;
      setLocalData(KEYS.RESOURCES, list);
    }

    // Add report record
    const reports = getLocalData(KEYS.REPORTS) || [];
    reports.unshift({
      id: "rep-" + Date.now().toString(36),
      resourceId: id,
      resourceTitle: list[idx]?.title || "Resource",
      reporterId: currentUser.uid,
      reporterName: currentUser.fullName,
      reason,
      status: "pending",
      createdAt: new Date().toISOString()
    });
    setLocalData(KEYS.REPORTS, reports);
    return true;
  }
};
