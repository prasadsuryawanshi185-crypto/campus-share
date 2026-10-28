import React, { useState } from "react";
import { Modal } from "../common/Modal";
import {
  CategoryBadge,
  ConditionBadge,
  StatusBadge,
  SharingTypeBadge
} from "../common/Badge";
import {
  Clock,
  MapPin,
  User,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Calendar,
  Share2,
  Tag
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useResources } from "../../context/ResourceContext";

export const ResourceDetailModal = ({
  resource,
  isOpen,
  onClose,
  onRequestBorrow
}) => {
  const { currentUser } = useAuth();
  const { handleFlagResource, openAuthModal } = useResources();
  const [reporting, setReporting] = useState(false);
  const [reportReason, setReportReason] = useState("");

  if (!resource) return null;

  const isOwner = currentUser?.uid === resource.ownerId;
  const isAvailable = resource.status === "Available";

  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      openAuthModal("login");
      return;
    }
    if (!reportReason.trim()) return;
    handleFlagResource(resource.id, reportReason);
    setReporting(false);
    setReportReason("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Resource Details"
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Top Media & Key Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 aspect-4/3">
            <img
              src={resource.imageUrl}
              alt={resource.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80";
              }}
            />
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
              <CategoryBadge category={resource.category} />
              <SharingTypeBadge type={resource.sharingType} />
            </div>
            <div className="absolute top-3 right-3">
              <StatusBadge status={resource.status} />
            </div>
          </div>

          {/* Quick Specifications */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  {resource.department}
                </span>
                <ConditionBadge condition={resource.condition} />
              </div>

              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                {resource.title}
              </h1>

              {/* Tags */}
              {resource.tags && resource.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {resource.tags.map(t => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium"
                    >
                      <Tag className="w-3 h-3 text-slate-400" />
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Terms and Location Card */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5 text-slate-500 font-medium">
                  <Clock className="w-4 h-4 text-blue-600" />
                  Lending Duration:
                </span>
                <span className="font-bold text-slate-900">{resource.maxDuration || "Semester / Flexible"}</span>
              </div>

              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5 text-slate-500 font-medium">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  Campus Pickup Hub:
                </span>
                <span className="font-bold text-slate-900">{resource.preferredPickup || "Central Library"}</span>
              </div>
            </div>

            {/* Safe Owner Card */}
            <div className="p-3.5 rounded-xl border border-blue-100 bg-blue-50/50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-xs flex-shrink-0">
                {resource.ownerName?.charAt(0) || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-slate-900 truncate">{resource.ownerName}</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" title="Verified WCE Student" />
                </div>
                <div className="text-xs text-slate-500 truncate">
                  {resource.ownerDept || "WCE Student"} • {resource.ownerYear || "Engineering"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Description */}
        <div className="border-t border-slate-100 pt-5 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            About this Resource
          </h4>
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {resource.description}
          </p>
        </div>

        {/* Safety & Community Note */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-amber-900">
          <ShieldCheck className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="leading-snug">
            <strong>CEP Community Trust Pledge:</strong> All items belong to fellow WCE students. Please inspect item condition during physical handover at the designated campus point and return promptly on the agreed date.
          </div>
        </div>

        {/* Report Section */}
        {reporting ? (
          <form onSubmit={handleReportSubmit} className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-3">
            <h5 className="text-xs font-bold text-rose-900 uppercase tracking-wider">
              Report Inappropriate or Broken Listing
            </h5>
            <textarea
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              required
              rows={2}
              placeholder="Please describe the issue (e.g., misleading description, damaged item, inappropriate content)..."
              className="w-full text-xs p-2.5 rounded-lg border border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setReporting(false)}
                className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 text-xs font-semibold bg-rose-600 text-white rounded-lg hover:bg-rose-700"
              >
                Submit Report
              </button>
            </div>
          </form>
        ) : (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setReporting(true)}
              className="text-[11px] text-slate-400 hover:text-rose-600 flex items-center gap-1 transition"
            >
              <AlertTriangle className="w-3 h-3" />
              Report listing to admin
            </button>
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition"
          >
            Back to Browse
          </button>

          {isOwner ? (
            <div className="text-xs font-semibold text-blue-700 bg-blue-50 px-4 py-2.5 rounded-xl border border-blue-200 text-center w-full sm:w-auto">
              This is your listed resource. Manage it from your Student Dashboard.
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                onClose();
                onRequestBorrow(resource);
              }}
              disabled={!isAvailable}
              className={`w-full sm:w-auto px-6 py-2.5 text-sm font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-sm ${
                isAvailable
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 active:scale-95"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              <span>{resource.sharingType === "Free to Keep" ? "Claim Resource" : "Request to Borrow"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};
