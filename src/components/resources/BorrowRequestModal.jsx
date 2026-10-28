import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { CAMPUS_PICKUP_POINTS } from "../../utils/constants";
import { Send, Calendar, MapPin, MessageSquare, ShieldCheck, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useResources } from "../../context/ResourceContext";

export const BorrowRequestModal = ({
  resource,
  isOpen,
  onClose
}) => {
  const { currentUser } = useAuth();
  const { handleSubmitRequest } = useResources();

  const [message, setMessage] = useState("");
  const [expectedReturnDate, setExpectedReturnDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState(CAMPUS_PICKUP_POINTS[0]);
  const [submitting, setSubmitting] = useState(false);

  if (!resource) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      setSubmitting(true);
      await handleSubmitRequest({
        resourceId: resource.id,
        resourceTitle: resource.title,
        ownerId: resource.ownerId,
        ownerName: resource.ownerName,
        message,
        expectedReturnDate,
        pickupLocation
      });
      setMessage("");
      setExpectedReturnDate("");
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={resource.sharingType === "Free to Keep" ? "Claim Resource Request" : "Submit Borrow Request"}
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Resource Overview Banner */}
        <div className="flex items-center gap-3 p-3 bg-blue-50/70 border border-blue-100 rounded-xl">
          <img
            src={resource.imageUrl}
            alt=""
            className="w-12 h-12 rounded-lg object-cover border border-blue-200 flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-slate-900 truncate">{resource.title}</h4>
            <p className="text-[11px] text-slate-500">
              Owner: <strong className="text-slate-700">{resource.ownerName}</strong> ({resource.ownerDept})
            </p>
          </div>
        </div>

        {/* Requester Identity Confirmation */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs space-y-1">
          <div className="flex items-center gap-2 text-slate-600 font-semibold">
            <User className="w-4 h-4 text-blue-600" />
            <span>Sending as Verified Student:</span>
          </div>
          <div className="pl-6 text-slate-700">
            <strong>{currentUser?.fullName}</strong> • {currentUser?.department?.split(" ")[0]} ({currentUser?.academicYear?.split(" ")[0]})
          </div>
        </div>

        {/* Expected Return Date (for Borrow) */}
        {resource.sharingType !== "Free to Keep" && (
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Expected Return Date *</span>
            </label>
            <input
              type="date"
              required
              min={new Date().toISOString().split("T")[0]}
              value={expectedReturnDate}
              onChange={(e) => setExpectedReturnDate(e.target.value)}
              className="w-full text-xs py-2.5 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-white"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Owner's preferred maximum duration: {resource.maxDuration || "Flexible"}.
            </p>
          </div>
        )}

        {/* Campus Pickup Spot */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>Proposed Campus Handover Location *</span>
          </label>
          <select
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="w-full text-xs py-2.5 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-white"
          >
            {CAMPUS_PICKUP_POINTS.map(point => (
              <option key={point} value={point}>{point}</option>
            ))}
          </select>
        </div>

        {/* Message to Owner */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-purple-600" />
            <span>Message to Owner (Purpose / Subject / Semester) *</span>
          </label>
          <textarea
            required
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Explain briefly why you need this item (e.g., preparing for end-sem exams, mini-project prototype) and confirm your commitment to return it on time..."
            className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-white"
          />
        </div>

        {/* Community Pledge */}
        <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-3 flex items-start gap-2 text-[11px] text-emerald-950">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          <span>
            By requesting, I pledge to take full responsibility for the condition of this item and ensure safe return to the owner at WCE.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2.5 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition flex items-center gap-1.5 disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{submitting ? "Sending Request..." : "Send Request to Owner"}</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
