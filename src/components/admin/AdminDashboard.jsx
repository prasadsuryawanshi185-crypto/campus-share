import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useResources } from "../../context/ResourceContext";
import { useToast } from "../../context/ToastContext";
import {
  Shield,
  Users,
  Package,
  AlertTriangle,
  Trash2,
  CheckCircle,
  Eye,
  Settings,
  Filter,
  BarChart3,
  ExternalLink
} from "lucide-react";
import { CategoryBadge, StatusBadge } from "../common/Badge";
import { COLLEGE_DOMAIN } from "../../utils/constants";
import { getLocalData, setLocalData, KEYS } from "../../services/storageService";

export const AdminDashboard = () => {
  const { currentUser, domainRestriction, setDomainRestriction, allDemoUsers } = useAuth();
  const { resources, requests, handleDeleteResource, handleUpdateResource, setActiveResource } = useResources();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState("overview"); // overview, listings, reports, users, settings
  const [reports, setReports] = useState(() => getLocalData(KEYS.REPORTS) || []);
  const [usersList, setUsersList] = useState(() => getLocalData(KEYS.USERS) || allDemoUsers);

  // Check authorization
  if (currentUser?.role !== "admin") {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-extrabold text-slate-900 mb-2">Access Restricted</h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
          You must be an authorized Faculty Coordinator or CEP Platform Administrator to access the administrative panel.
        </p>
        <p className="text-xs text-blue-600 font-semibold">
          Tip: You can switch to the "Dr. A. P. Joshi (CEP Admin)" account using the demo switcher in the top banner to test this panel.
        </p>
      </div>
    );
  }

  const totalUsers = usersList.length;
  const totalResources = resources.length;
  const totalBorrows = requests.filter(r => r.status === "accepted").length;
  const pendingReports = reports.filter(r => r.status === "pending").length;

  const handleResolveReport = (reportId) => {
    const updated = reports.map(r => r.id === reportId ? { ...r, status: "resolved" } : r);
    setReports(updated);
    setLocalData(KEYS.REPORTS, updated);
    addToast("Report resolved.", "info");
  };

  const handleRemoveFlaggedListing = async (resourceId, reportId) => {
    await handleDeleteResource(resourceId);
    handleResolveReport(reportId);
    addToast("Violating listing removed permanently from platform.", "success");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Top Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-300">
              <Shield className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-purple-300">
              CEP Administrative Control Console
            </span>
          </div>
          <h1 className="text-2xl font-black tracking-tight">CampusShare Moderation & Statistics</h1>
          <p className="text-xs text-slate-400">
            Administrator: <strong className="text-white">{currentUser.fullName}</strong> ({currentUser.department})
          </p>
        </div>

        {/* Quick Admin Badges */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700/80 text-xs">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">WCE Domain Guard</span>
            <span className="font-bold text-emerald-400">@{COLLEGE_DOMAIN} Active</span>
          </div>
        </div>
      </div>

      {/* Admin Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Resources</span>
            <Package className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{totalResources}</div>
          <div className="text-[11px] text-slate-500 mt-1">Listed across 6 departments</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Registered Students</span>
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{totalUsers}</div>
          <div className="text-[11px] text-slate-500 mt-1">Verified college profiles</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Borrows</span>
            <BarChart3 className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{totalBorrows}</div>
          <div className="text-[11px] text-slate-500 mt-1">Items currently on loan</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Reports Pending</span>
            <AlertTriangle className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-slate-900">{pendingReports}</div>
          <div className="text-[11px] text-slate-500 mt-1">Requires review</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("overview")}
          className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-1.5 transition ${
            activeTab === "overview" ? "border-purple-600 text-purple-700" : "border-transparent text-slate-500"
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Listing Moderation ({resources.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("reports")}
          className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-1.5 transition ${
            activeTab === "reports" ? "border-purple-600 text-purple-700" : "border-transparent text-slate-500"
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Reports & Flags ({pendingReports})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("users")}
          className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-1.5 transition ${
            activeTab === "users" ? "border-purple-600 text-purple-700" : "border-transparent text-slate-500"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Student Directory ({usersList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("settings")}
          className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-1.5 transition ${
            activeTab === "settings" ? "border-purple-600 text-purple-700" : "border-transparent text-slate-500"
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Platform Settings</span>
        </button>
      </div>

      {/* Tab: Resource Moderation Table */}
      {activeTab === "overview" && (
        <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs space-y-4 p-5">
          <h3 className="text-base font-bold text-slate-900">Manage All Resource Listings</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Title & Details</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Owner</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Created</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {resources.map(res => (
                  <tr key={res.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 px-4 max-w-xs">
                      <div className="font-bold text-slate-900 truncate">{res.title}</div>
                      <div className="text-[11px] text-slate-500 truncate">{res.department}</div>
                    </td>
                    <td className="py-3 px-4">
                      <CategoryBadge category={res.category} />
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-800">{res.ownerName}</div>
                      <div className="text-[10px] text-slate-400">{res.ownerDept}</div>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={res.status} />
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {new Date(res.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right space-x-1">
                      <button
                        type="button"
                        onClick={() => setActiveResource(res)}
                        className="p-1.5 text-slate-500 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Remove listing "${res.title}" permanently?`)) {
                            handleDeleteResource(res.id);
                          }
                        }}
                        className="p-1.5 text-rose-500 hover:text-rose-700 rounded-lg hover:bg-rose-50 transition"
                        title="Remove Listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Reports & Flags */}
      {activeTab === "reports" && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900">User Reports & Moderation Queue</h3>
          {reports.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">No reports submitted. All clear!</div>
          ) : (
            <div className="space-y-3">
              {reports.map(rep => (
                <div
                  key={rep.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        rep.status === "pending" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
                      }`}>
                        {rep.status}
                      </span>
                      <strong className="text-xs text-slate-900">{rep.resourceTitle}</strong>
                    </div>
                    <p className="text-xs text-slate-600">
                      Reported by: <span className="font-semibold">{rep.reporterName}</span> • Reason: "{rep.reason}"
                    </p>
                    <span className="text-[10px] text-slate-400">
                      Reported on: {new Date(rep.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {rep.status === "pending" && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleResolveReport(rep.id)}
                          className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100"
                        >
                          Dismiss / Mark Safe
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveFlaggedListing(rep.resourceId, rep.id)}
                          className="px-3 py-1.5 text-xs font-bold rounded-lg bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Listing</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Users */}
      {activeTab === "users" && (
        <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs p-5 space-y-4">
          <h3 className="text-base font-bold text-slate-900">Student Directory ({usersList.length})</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Year</th>
                  <th className="py-3 px-4">PRN</th>
                  <th className="py-3 px-4">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {usersList.map(u => (
                  <tr key={u.uid} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                      <img src={u.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                      <span>{u.fullName}</span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600">{u.collegeEmail}</td>
                    <td className="py-3 px-4">{u.department.split(" ")[0]}</td>
                    <td className="py-3 px-4">{u.academicYear.split(" ")[0]}</td>
                    <td className="py-3 px-4 font-mono text-slate-500">{u.prn}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        u.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                      }`}>
                        {u.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Platform Settings */}
      {activeTab === "settings" && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs max-w-2xl space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">Platform Security & Institution Settings</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Configure access boundaries and verified student domain policies.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <h4 className="text-xs font-bold text-slate-900">Restrict Sign-ups to College Email</h4>
                <p className="text-[11px] text-slate-500">
                  Enforce student emails ending with @{COLLEGE_DOMAIN} during registration.
                </p>
              </div>
              <input
                type="checkbox"
                checked={domainRestriction}
                onChange={(e) => setDomainRestriction(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </div>

            <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200 text-xs text-blue-900 space-y-1">
              <strong>Server-Enforced Authorization Note:</strong>
              <p>
                In production, Firestore Security Rules (defined in <code>firestore.rules</code>) strictly verify the administrator role via Firebase Auth token custom claims or verified administrative bootstrap email before permitting deletion or system moderation.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
