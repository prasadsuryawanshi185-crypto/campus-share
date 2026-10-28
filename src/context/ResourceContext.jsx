import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { resourceService } from "../services/resourceService";
import { requestService } from "../services/requestService";
import { notificationService } from "../services/notificationService";
import { useAuth } from "./AuthContext";
import { useToast } from "./ToastContext";

const ResourceContext = createContext(null);

export const ResourceProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const { addToast } = useToast();

  const [resources, setResources] = useState([]);
  const [requests, setRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [selectedSharingType, setSelectedSharingType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Active Modals state
  const [activeResource, setActiveResource] = useState(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState("login"); // 'login' | 'register'
  const [editingResource, setEditingResource] = useState(null);

  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);
      const resList = await resourceService.getAllResources();
      setResources(resList);

      const reqList = await requestService.getAllRequests();
      setRequests(reqList);

      if (currentUser?.uid) {
        const notifList = await notificationService.getNotifications(currentUser.uid);
        setNotifications(notifList);
      }
    } catch (err) {
      console.error("Failed to load platform data:", err);
      addToast("Could not sync latest platform data. Working with local cache.", "warning");
    } finally {
      setLoading(false);
    }
  }, [currentUser?.uid, addToast]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Periodic refresh or on user switch
  useEffect(() => {
    if (currentUser?.uid) {
      notificationService.getNotifications(currentUser.uid).then(setNotifications);
    }
  }, [currentUser?.uid]);

  // Filtered & Sorted resources calculation
  const filteredResources = useMemo(() => {
    return resources.filter(res => {
      // Exclude flagged from public unless admin
      if (res.isFlagged && currentUser?.role !== "admin") return false;

      // Category filter
      if (selectedCategory !== "all" && res.category !== selectedCategory) return false;

      // Condition filter
      if (selectedCondition !== "all" && res.condition !== selectedCondition) return false;

      // Sharing Type filter
      if (selectedSharingType !== "all" && res.sharingType !== selectedSharingType) return false;

      // Status filter
      if (selectedStatus !== "all" && res.status !== selectedStatus) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const titleMatch = res.title?.toLowerCase().includes(q);
        const descMatch = res.description?.toLowerCase().includes(q);
        const deptMatch = res.department?.toLowerCase().includes(q);
        const ownerMatch = res.ownerName?.toLowerCase().includes(q);
        const tagMatch = res.tags?.some(t => t.toLowerCase().includes(q));
        return titleMatch || descMatch || deptMatch || ownerMatch || tagMatch;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      if (sortBy === "title_asc") {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === "title_desc") {
        return b.title.localeCompare(a.title);
      }
      if (sortBy === "views") {
        return (b.viewsCount || 0) - (a.viewsCount || 0);
      }
      return 0;
    });
  }, [resources, searchQuery, selectedCategory, selectedCondition, selectedSharingType, selectedStatus, sortBy, currentUser]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedCondition("all");
    setSelectedSharingType("all");
    setSelectedStatus("all");
    setSortBy("newest");
  };

  const handleAddResource = async (formData) => {
    try {
      const created = await resourceService.createResource(formData, currentUser);
      setResources(prev => [created, ...prev]);
      addToast(`"${created.title}" successfully listed on CampusShare!`, "success");
      setIsAddModalOpen(false);
      return created;
    } catch (err) {
      addToast(err.message || "Failed to add resource.", "error");
      throw err;
    }
  };

  const handleUpdateResource = async (id, updates) => {
    try {
      const updated = await resourceService.updateResource(id, updates, currentUser);
      setResources(prev => prev.map(r => r.id === id ? { ...r, ...updated } : r));
      if (activeResource?.id === id) {
        setActiveResource(prev => ({ ...prev, ...updated }));
      }
      addToast("Resource listing updated successfully.", "success");
      setEditingResource(null);
      return updated;
    } catch (err) {
      addToast(err.message || "Failed to update resource.", "error");
      throw err;
    }
  };

  const handleDeleteResource = async (id) => {
    try {
      await resourceService.deleteResource(id, currentUser);
      setResources(prev => prev.filter(r => r.id !== id));
      if (activeResource?.id === id) {
        setActiveResource(null);
      }
      addToast("Resource listing removed.", "info");
      return true;
    } catch (err) {
      addToast(err.message || "Failed to delete resource.", "error");
      throw err;
    }
  };

  const handleFlagResource = async (id, reason) => {
    try {
      await resourceService.flagResource(id, reason, currentUser);
      addToast("Listing reported for admin review. Thank you for keeping the campus community safe.", "info");
      return true;
    } catch (err) {
      addToast(err.message || "Failed to report listing.", "error");
      throw err;
    }
  };

  const handleSubmitRequest = async (requestData) => {
    try {
      const req = await requestService.createRequest(requestData, currentUser);
      setRequests(prev => [req, ...prev]);
      addToast(`Borrow request sent to ${requestData.ownerName}!`, "success");
      setIsRequestModalOpen(false);
      // Refresh to update statuses
      fetchAllData();
      return req;
    } catch (err) {
      addToast(err.message || "Failed to submit request.", "error");
      throw err;
    }
  };

  const handleRespondToRequest = async (requestId, newStatus, responseNote = "") => {
    try {
      const updated = await requestService.respondToRequest(requestId, newStatus, currentUser, responseNote);
      setRequests(prev => prev.map(r => r.id === requestId ? updated : r));
      
      const statusMsgs = {
        accepted: "Request accepted! The student has been notified for pickup.",
        rejected: "Request declined.",
        returned: "Item marked as returned and is now Available again!",
        cancelled: "Request cancelled."
      };
      addToast(statusMsgs[newStatus] || "Request updated.", "success");
      fetchAllData();
      return updated;
    } catch (err) {
      addToast(err.message || "Failed to update request.", "error");
      throw err;
    }
  };

  const handleMarkNotificationRead = async (notifId) => {
    if (!currentUser) return;
    await notificationService.markAsRead(notifId, currentUser.uid);
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  const handleMarkAllNotificationsRead = async () => {
    if (!currentUser) return;
    await notificationService.markAllAsRead(currentUser.uid);
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    addToast("All notifications marked as read.", "info");
  };

  const openAuthModal = (tab = "login") => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  return (
    <ResourceContext.Provider
      value={{
        resources,
        filteredResources,
        requests,
        notifications,
        loading,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedCondition,
        setSelectedCondition,
        selectedSharingType,
        setSelectedSharingType,
        selectedStatus,
        setSelectedStatus,
        sortBy,
        setSortBy,
        clearFilters,
        activeResource,
        setActiveResource,
        isRequestModalOpen,
        setIsRequestModalOpen,
        isAddModalOpen,
        setIsAddModalOpen,
        editingResource,
        setEditingResource,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        openAuthModal,
        handleAddResource,
        handleUpdateResource,
        handleDeleteResource,
        handleFlagResource,
        handleSubmitRequest,
        handleRespondToRequest,
        handleMarkNotificationRead,
        handleMarkAllNotificationsRead,
        refreshData: fetchAllData,
      }}
    >
      {children}
    </ResourceContext.Provider>
  );
};

export const useResources = () => {
  const context = useContext(ResourceContext);
  if (!context) {
    throw new Error("useResources must be used within a ResourceProvider");
  }
  return context;
};
