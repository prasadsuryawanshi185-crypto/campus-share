import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useResources } from "../../context/ResourceContext";
import { useToast } from "../../context/ToastContext";
import {
  CategoryBadge,
  ConditionBadge,
  StatusBadge,
  SharingTypeBadge
} from "../common/Badge";
import {
  BookOpen,
  Send,
  Inbox,
  Bell,
  User,
  PlusCircle,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Calendar,
  ShieldCheck,
  RotateCcw,
  Sparkles
} from "lucide-react";
import { DEPARTMENTS, ACADEMIC_YEARS } from "../../utils/constants";

export const StudentDashboard = () => {
  const { currentUser, updateProfile } = useAuth();
  const {
    resources,
    requests,
    notifications,
    setIsAddModalOpen,
    setEditingResource,
    handleDeleteResource,
    handleRespondToRequest,
    handleMarkNotificationRead,
    handleMarkAllNotificationsRead,
    setActiveResource
  } = useResources();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState("listings"); // listings, myRequests, receivedRequests, notifications, profile

  // Profile Form state
  const [profileName, setProfileName] = useState(currentUser?.fullName || "");
  const [profileDept, setProfileDept] = useState(currentUser?.department || DEPARTMENTS[0]);
  const [profileYear, setProfileYear] = useState(currentUser?.academicYear || ACADEMIC_YEARS[2]);
  const [profileBio, setProfileBio] = useState(currentUser?.bio || "");
  const [profileSaving, setProfileSaving] = useState(false);

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Please Sign In</h2>
        <p className="text-sm text-slate-500 mb-6">You need to sign in with your college credentials to view your student dashboard.</p>
      </div>
    );
  }

  // Filter items for current user
  const myListings = resources.filter(r => r.ownerId === currentUser.uid);
  const myBorrowRequests = requests.filter(r => r.requesterId === currentUser.uid);
  const receivedRequests = requests.filter(r => r.ownerId === currentUser.uid);
  const myNotifications = notifications;

  const activeBorrowsCount = myBorrowRequests.filter(r => r.status === "accepted").length;
  const pendingReceivedCount = receivedRequests.filter(r => r.status === "pending").length;
  const unreadNotifCount = myNotifications.filter(n => !n.read).length;

  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      setProfileSaving(true);
      await updateProfile({
        fullName: profileName,
        department: profileDept,
        academicYear: profileYear,
        bio: profileBio
      });
      addToast("Profile updated successfully.", "success");
    } catch (err) {
      addToast("Failed to update profile.", "error");
    } finally {
      setProfileSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80"}
              alt=""
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black tracking-tight">{currentUser.fullName}</h1>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Verified WCE Student
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {currentUser.department} • {currentUser.academicYear} • PRN: <span className="font-mono text-blue-200">{currentUser.prn || "2024BTECS001"}</span>
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                College Email: <span className="text-slate-300">{currentUser.collegeEmail}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="self-start sm:self-auto px-5 py-2.5 text-xs font-bold rounded-xl bg-blue-500 hover:bg-blue-600 text-white shadow-md shadow-blue-500/20 flex items-center gap-2 transition active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>List New Resource</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-white/10 text-center">
          <div className="bg-white/5 backdrop-blur-xs rounded-2xl p-3 border border-white/10">
            <div className="text-2xl font-black text-white">{myListings.length}</div>
            <div className="text-[11px] text-slate-300 font-medium">My Listings</div>
          </div>
          <div className="bg-white/5 backdrop-blur-xs rounded-2xl p-3 border border-white/10">
            <div className="text-2xl font-black text-emerald-400">{activeBorrowsCount}</div>
            <div className="text-[11px] text-slate-300 font-medium">Active Borrows</div>
          </div>
          <div className="bg-white/5 backdrop-blur-xs rounded-2xl p-3 border border-white/10">
            <div className="text-2xl font-black text-amber-300">{pendingReceivedCount}</div>
            <div className="text-[11px] text-slate-300 font-medium">Incoming Pending</div>
          </div>
          <div className="bg-white/5 backdrop-blur-xs rounded-2xl p-3 border border-white/10">
            <div className="text-2xl font-black text-blue-300">{unreadNotifCount}</div>
            <div className="text-[11px] text-slate-300 font-medium">Unread Alerts</div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 overflow-x-auto gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("listings")}
          className={`py-3 px-4 text-xs font-bold whitespace-nowrap border-b-2 flex items-center gap-2 transition ${
            activeTab === "listings"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>My Listings ({myListings.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("myRequests")}
          className={`py-3 px-4 text-xs font-bold whitespace-nowrap border-b-2 flex items-center gap-2 transition ${
            activeTab === "myRequests"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Send className="w-4 h-4" />
          <span>My Borrow Requests ({myBorrowRequests.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("receivedRequests")}
          className={`py-3 px-4 text-xs font-bold whitespace-nowrap border-b-2 flex items-center gap-2 transition relative ${
            activeTab === "receivedRequests"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Inbox className="w-4 h-4" />
          <span>Requests Received ({receivedRequests.length})</span>
          {pendingReceivedCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("notifications")}
          className={`py-3 px-4 text-xs font-bold whitespace-nowrap border-b-2 flex items-center gap-2 transition ${
            activeTab === "notifications"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Notifications ({myNotifications.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("profile")}
          className={`py-3 px-4 text-xs font-bold whitespace-nowrap border-b-2 flex items-center gap-2 transition ${
            activeTab === "profile"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile Settings</span>
        </button>
      </div>

      {/* Tab 1: My Listings */}
      {activeTab === "listings" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Academic Resources You Are Sharing ({myListings.length})
            </h3>
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="px-3.5 py-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 rounded-xl flex items-center gap-1.5 transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Resource</span>
            </button>
          </div>

          {myListings.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center space-y-3">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mx-auto">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">You haven't listed any resources yet</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Help fellow students at WCE by listing textbooks, scientific calculators, or lab toolkits you are not currently using.
              </p>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="mt-2 px-4 py-2 text-xs font-bold bg-blue-600 text-white rounded-xl shadow-xs"
              >
                List Your First Item
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {myListings.map(item => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs flex flex-col justify-between"
                >
                  <div className="relative h-40 bg-slate-100">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <CategoryBadge category={item.category} />
                    </div>
                    <div className="absolute top-2.5 right-2.5">
                      <StatusBadge status={item.status} />
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                        <ConditionBadge condition={item.condition} />
                        <SharingTypeBadge type={item.sharingType} />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{item.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1">{item.description}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingResource(item);
                          setIsAddModalOpen(true);
                        }}
                        className="flex-1 py-1.5 px-2.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1 transition"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
                            handleDeleteResource(item.id);
                          }
                        }}
                        className="py-1.5 px-2.5 text-xs font-semibold rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 flex items-center justify-center gap-1 transition"
                        title="Delete listing"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: My Borrow Requests */}
      {activeTab === "myRequests" && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            Resources You Have Requested to Borrow ({myBorrowRequests.length})
          </h3>

          {myBorrowRequests.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center text-xs text-slate-500">
              You have not submitted any borrow requests yet. Browse the catalog to find items.
            </div>
          ) : (
            <div className="space-y-3">
              {myBorrowRequests.map(req => {
                let statusColor = "bg-amber-50 text-amber-800 border-amber-200";
                if (req.status === "accepted") statusColor = "bg-emerald-50 text-emerald-800 border-emerald-200";
                if (req.status === "rejected") statusColor = "bg-rose-50 text-rose-800 border-rose-200";
                if (req.status === "returned") statusColor = "bg-blue-50 text-blue-800 border-blue-200";

                return (
                  <div
                    key={req.id}
                    className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${statusColor}`}>
                          {req.status}
                        </span>
                        <span className="text-xs text-slate-400">
                          Requested: {new Date(req.requestedAt).toLocaleDateString()}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900">{req.resourceTitle}</h4>
                      <p className="text-xs text-slate-600">
                        Owner: <strong>{req.ownerName}</strong>
                      </p>
                      <p className="text-xs text-slate-500 italic bg-slate-50 p-2 rounded-lg border border-slate-100">
                        "{req.message}"
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 pt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                          Pickup: {req.pickupLocation}
                        </span>
                        {req.expectedReturnDate && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-blue-600" />
                            Return by: {req.expectedReturnDate}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions for Requester */}
                    <div className="flex items-center gap-2 self-end md:self-auto">
                      {req.status === "accepted" && (
                        <button
                          type="button"
                          onClick={() => handleRespondToRequest(req.id, "returned")}
                          className="px-3.5 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 transition"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Mark Returned</span>
                        </button>
                      )}

                      {req.status === "pending" && (
                        <button
                          type="button"
                          onClick={() => handleRespondToRequest(req.id, "cancelled")}
                          className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 transition"
                        >
                          Cancel Request
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Requests Received */}
      {activeTab === "receivedRequests" && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            Incoming Borrow Requests from Students ({receivedRequests.length})
          </h3>

          {receivedRequests.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center text-xs text-slate-500">
              No borrow requests received on your listed resources yet.
            </div>
          ) : (
            <div className="space-y-3">
              {receivedRequests.map(req => (
                <div
                  key={req.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded mr-2">
                        Resource Requested
                      </span>
                      <strong className="text-sm text-slate-900">{req.resourceTitle}</strong>
                    </div>
                    <span className="text-xs text-slate-400">
                      {new Date(req.requestedAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Requester Info */}
                  <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3 text-xs space-y-1">
                    <div className="flex items-center gap-2 text-slate-900 font-bold">
                      <User className="w-4 h-4 text-blue-600" />
                      <span>{req.requesterName}</span>
                      <span className="font-normal text-slate-500">({req.requesterDept} • {req.requesterYear})</span>
                    </div>
                    <div className="text-slate-600 pl-6">
                      <strong>Note:</strong> "{req.message}"
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-slate-500 pl-6 pt-1">
                      <span>Pickup Hub: <strong className="text-slate-700">{req.pickupLocation}</strong></span>
                      {req.expectedReturnDate && (
                        <span>Expected Return: <strong className="text-slate-700">{req.expectedReturnDate}</strong></span>
                      )}
                    </div>
                  </div>

                  {/* Request Status & Owner Action Buttons */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="text-xs">
                      Status: <strong className="capitalize text-slate-800">{req.status}</strong>
                    </div>

                    <div className="flex items-center gap-2">
                      {req.status === "pending" && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleRespondToRequest(req.id, "rejected")}
                            className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 transition flex items-center gap-1"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Decline</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRespondToRequest(req.id, "accepted")}
                            className="px-4 py-1.5 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition flex items-center gap-1"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Accept Request</span>
                          </button>
                        </>
                      )}

                      {req.status === "accepted" && (
                        <button
                          type="button"
                          onClick={() => handleRespondToRequest(req.id, "returned")}
                          className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition flex items-center gap-1"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Mark Item Returned & Reset Available</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Notifications */}
      {activeTab === "notifications" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Activity & Notifications ({myNotifications.length})
            </h3>
            {unreadNotifCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllNotificationsRead}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                Mark all as read
              </button>
            )}
          </div>

          {myNotifications.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center text-xs text-slate-500">
              No notifications yet.
            </div>
          ) : (
            <div className="divide-y divide-slate-100 bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
              {myNotifications.map(n => (
                <div
                  key={n.id}
                  onClick={() => handleMarkNotificationRead(n.id)}
                  className={`p-4 transition flex items-start justify-between gap-4 cursor-pointer ${
                    !n.read ? "bg-blue-50/40" : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      !n.read ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                    }`}>
                      <Bell className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 mb-0.5">{n.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{n.message}</p>
                      <span className="text-[10px] text-slate-400 mt-1 inline-block">
                        {new Date(n.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {!n.read && (
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 flex-shrink-0 mt-1" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 5: Profile Settings */}
      {activeTab === "profile" && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs max-w-2xl space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">Student Profile & Academic Settings</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Keep your department and semester up to date so juniors and peers can find your relevant study resources.
            </p>
          </div>

          <form onSubmit={handleProfileSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="w-full text-xs py-2 px-3 rounded-xl border border-slate-200 bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
                <select
                  value={profileDept}
                  onChange={(e) => setProfileDept(e.target.value)}
                  className="w-full text-xs py-2 px-3 rounded-xl border border-slate-200 bg-white"
                >
                  {DEPARTMENTS.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Academic Year</label>
                <select
                  value={profileYear}
                  onChange={(e) => setProfileYear(e.target.value)}
                  className="w-full text-xs py-2 px-3 rounded-xl border border-slate-200 bg-white"
                >
                  {ACADEMIC_YEARS.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">College Email (Read-Only)</label>
              <input
                type="email"
                disabled
                value={currentUser.collegeEmail}
                className="w-full text-xs py-2 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Short Bio / Study Interests</label>
              <textarea
                rows={3}
                value={profileBio}
                onChange={(e) => setProfileBio(e.target.value)}
                placeholder="Mention the courses you are currently taking, exam preparations, or what study gear you have to share..."
                className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={profileSaving}
                className="px-5 py-2 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition disabled:opacity-50"
              >
                {profileSaving ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
