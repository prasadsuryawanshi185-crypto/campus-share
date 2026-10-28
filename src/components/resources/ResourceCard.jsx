import React from "react";
import {
  CategoryBadge,
  ConditionBadge,
  StatusBadge,
  SharingTypeBadge
} from "../common/Badge";
import { Clock, MapPin, User, ArrowRight, Eye } from "lucide-react";

export const ResourceCard = ({
  resource,
  onViewDetails,
  onRequestBorrow,
  currentUserId
}) => {
  const isOwner = currentUserId === resource.ownerId;
  const isAvailable = resource.status === "Available";

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1">
      {/* Image Container with Badges */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={resource.imageUrl}
          alt={resource.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80";
          }}
        />
        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <CategoryBadge category={resource.category} />
          <SharingTypeBadge type={resource.sharingType} />
        </div>
        <div className="absolute top-3 right-3 z-10">
          <StatusBadge status={resource.status} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Dept & Condition row */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              {resource.department?.split(" ")[0] || "WCE"}
            </span>
            <ConditionBadge condition={resource.condition} />
          </div>

          {/* Title */}
          <h3
            onClick={() => onViewDetails(resource)}
            className="text-base font-bold text-slate-900 line-clamp-2 hover:text-blue-600 cursor-pointer transition leading-snug mb-2"
          >
            {resource.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
            {resource.description}
          </p>
        </div>

        {/* Footer info: Owner & Meta */}
        <div className="space-y-3 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-1.5 min-w-0">
              <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-[10px] font-bold">
                {resource.ownerName?.charAt(0) || "U"}
              </div>
              <span className="truncate max-w-[120px] font-medium text-slate-700">
                {resource.ownerName}
              </span>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <Clock className="w-3 h-3" />
              <span>{resource.maxDuration?.split(" ")[0] || "Flexible"}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => onViewDetails(resource)}
              className="w-full py-2 px-3 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              <span>Details</span>
            </button>

            {isOwner ? (
              <button
                type="button"
                onClick={() => onViewDetails(resource)}
                className="w-full py-2 px-3 text-xs font-semibold rounded-xl bg-slate-100 text-slate-600 transition text-center"
              >
                Your Listing
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onRequestBorrow(resource)}
                disabled={!isAvailable}
                className={`w-full py-2 px-3 text-xs font-semibold rounded-xl transition flex items-center justify-center gap-1 ${
                  isAvailable
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
              >
                <span>{resource.sharingType === "Free to Keep" ? "Claim" : "Borrow"}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
