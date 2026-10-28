import { db, isFirebaseConfigured } from "./firebase";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  serverTimestamp
} from "firebase/firestore";
import { KEYS, getLocalData, setLocalData } from "./storageService";
import { notificationService } from "./notificationService";
import { resourceService } from "./resourceService";

export const requestService = {
  async getAllRequests() {
    if (isFirebaseConfigured() && db) {
      try {
        const snap = await getDocs(collection(db, "borrowRequests"));
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
      } catch (err) {
        console.warn("Firestore fetch borrowRequests failed, falling back to local:", err);
      }
    }
    return getLocalData(KEYS.REQUESTS) || [];
  },

  async getMyRequests(userId) {
    const list = await this.getAllRequests();
    return list.filter(req => req.requesterId === userId);
  },

  async getReceivedRequests(ownerId) {
    const list = await this.getAllRequests();
    return list.filter(req => req.ownerId === ownerId);
  },

  async createRequest(requestData, currentUser) {
    if (!currentUser) throw new Error("Authentication required.");

    if (currentUser.uid === requestData.ownerId) {
      throw new Error("You cannot borrow your own listed resource.");
    }

    const allRequests = getLocalData(KEYS.REQUESTS) || [];
    const existing = allRequests.find(
      r => r.resourceId === requestData.resourceId &&
           r.requesterId === currentUser.uid &&
           (r.status === "pending" || r.status === "accepted")
    );

    if (existing) {
      throw new Error("You already have an active or pending request for this resource.");
    }

    const newRequest = {
      resourceId: requestData.resourceId,
      resourceTitle: requestData.resourceTitle,
      ownerId: requestData.ownerId,
      ownerName: requestData.ownerName,
      requesterId: currentUser.uid,
      requesterName: currentUser.fullName,
      requesterEmail: currentUser.collegeEmail,
      requesterDept: currentUser.department,
      requesterYear: currentUser.academicYear,
      message: requestData.message?.trim() || "Hi, I would like to borrow this academic resource for coursework.",
      expectedReturnDate: requestData.expectedReturnDate || "",
      pickupLocation: requestData.pickupLocation || "Central Library Entrance",
      status: "pending", // pending, accepted, rejected, returned, cancelled
      requestedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    let createdId = "req-" + Date.now().toString(36);

    if (isFirebaseConfigured() && db) {
      try {
        const docRef = await addDoc(collection(db, "borrowRequests"), {
          ...newRequest,
          requestedAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        createdId = docRef.id;
      } catch (err) {
        console.warn("Firestore addDoc failed, using local fallback:", err);
      }
    }

    // Save locally
    const saved = { id: createdId, ...newRequest };
    allRequests.unshift(saved);
    setLocalData(KEYS.REQUESTS, allRequests);

    // Send Notification to Owner
    await notificationService.createNotification({
      recipientId: requestData.ownerId,
      type: "new_request",
      title: "New Borrow Request Received",
      message: `${currentUser.fullName} (${currentUser.department?.split(" ")[0] || "Student"}) requested to borrow "${requestData.resourceTitle}".`,
      relatedResourceId: requestData.resourceId,
      relatedRequestId: createdId
    });

    return saved;
  },

  async respondToRequest(requestId, newStatus, currentUser, responseNote = "") {
    if (!currentUser) throw new Error("Authentication required.");

    const allRequests = getLocalData(KEYS.REQUESTS) || [];
    const idx = allRequests.findIndex(r => r.id === requestId);
    if (idx === -1) throw new Error("Request not found.");

    const req = allRequests[idx];

    // Authorization checks
    if (newStatus === "accepted" || newStatus === "rejected") {
      if (req.ownerId !== currentUser.uid && currentUser.role !== "admin") {
        throw new Error("Only the resource owner can accept or reject this request.");
      }
    } else if (newStatus === "cancelled") {
      if (req.requesterId !== currentUser.uid && currentUser.role !== "admin") {
        throw new Error("Only the requester can cancel this request.");
      }
    } else if (newStatus === "returned") {
      if (req.ownerId !== currentUser.uid && req.requesterId !== currentUser.uid && currentUser.role !== "admin") {
        throw new Error("Only the owner or borrower can mark this item as returned.");
      }
    }

    req.status = newStatus;
    req.responseNote = responseNote;
    req.updatedAt = new Date().toISOString();
    allRequests[idx] = req;
    setLocalData(KEYS.REQUESTS, allRequests);

    // Resource status sync
    if (newStatus === "accepted") {
      await resourceService.updateResource(req.resourceId, { status: "Borrowed" }, currentUser);
      // Notify requester
      await notificationService.createNotification({
        recipientId: req.requesterId,
        type: "request_accepted",
        title: "Borrow Request Accepted!",
        message: `${currentUser.fullName} accepted your request for "${req.resourceTitle}". Pickup point: ${req.pickupLocation}.`,
        relatedResourceId: req.resourceId,
        relatedRequestId: req.id
      });
    } else if (newStatus === "rejected") {
      // Notify requester
      await notificationService.createNotification({
        recipientId: req.requesterId,
        type: "request_rejected",
        title: "Borrow Request Declined",
        message: `${currentUser.fullName} was unable to fulfill your request for "${req.resourceTitle}".`,
        relatedResourceId: req.resourceId,
        relatedRequestId: req.id
      });
    } else if (newStatus === "returned") {
      await resourceService.updateResource(req.resourceId, { status: "Available" }, currentUser);
      // Notify other party
      const notifyTarget = (currentUser.uid === req.ownerId) ? req.requesterId : req.ownerId;
      await notificationService.createNotification({
        recipientId: notifyTarget,
        type: "item_returned",
        title: "Resource Returned & Completed",
        message: `"${req.resourceTitle}" has been marked as safely returned and is now available again for students.`,
        relatedResourceId: req.resourceId,
        relatedRequestId: req.id
      });
    }

    return req;
  }
};
