import React from "react";

export const CategoryBadge = ({ category, className = "" }) => {
  const styles = {
    Books: "bg-blue-50 text-blue-700 border-blue-200",
    Notes: "bg-purple-50 text-purple-700 border-purple-200",
    Calculators: "bg-amber-50 text-amber-700 border-amber-200",
    "Lab Equipment": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Project Components": "bg-indigo-50 text-indigo-700 border-indigo-200",
    Other: "bg-slate-100 text-slate-700 border-slate-200",
  };

  const style = styles[category] || styles.Other;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${style} ${className}`}
    >
      {category}
    </span>
  );
};

export const ConditionBadge = ({ condition, className = "" }) => {
  let style = "bg-slate-100 text-slate-700 border-slate-200";
  if (condition === "Like New") {
    style = "bg-emerald-50 text-emerald-700 border-emerald-200";
  } else if (condition === "Good") {
    style = "bg-sky-50 text-sky-700 border-sky-200";
  } else if (condition === "Fair") {
    style = "bg-amber-50 text-amber-700 border-amber-200";
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${style} ${className}`}
    >
      {condition}
    </span>
  );
};

export const StatusBadge = ({ status, className = "" }) => {
  let dotColor = "bg-emerald-500";
  let textColor = "text-emerald-700 bg-emerald-50 border-emerald-200";

  if (status === "Borrowed") {
    dotColor = "bg-indigo-500";
    textColor = "text-indigo-700 bg-indigo-50 border-indigo-200";
  } else if (status === "Requested") {
    dotColor = "bg-amber-500";
    textColor = "text-amber-700 bg-amber-50 border-amber-200";
  } else if (status === "Unavailable") {
    dotColor = "bg-slate-400";
    textColor = "text-slate-600 bg-slate-100 border-slate-200";
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${textColor} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} aria-hidden="true" />
      {status}
    </span>
  );
};

export const SharingTypeBadge = ({ type, className = "" }) => {
  let style = "bg-slate-100 text-slate-700 border-slate-200";
  if (type === "Borrow") {
    style = "bg-blue-50 text-blue-700 border-blue-200";
  } else if (type === "Free to Keep") {
    style = "bg-emerald-50 text-emerald-800 border-emerald-200 font-bold";
  } else if (type === "Exchange") {
    style = "bg-violet-50 text-violet-700 border-violet-200";
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${style} ${className}`}
    >
      {type === "Free to Keep" ? "Free Donation" : type}
    </span>
  );
};
