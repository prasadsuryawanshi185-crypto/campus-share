import React from "react";
import { Search, X, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { CATEGORIES, CONDITIONS, SHARING_TYPES } from "../../utils/constants";

export const ResourceFilterBar = ({
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
  totalResults
}) => {
  const isFiltered =
    searchQuery.trim() !== "" ||
    selectedCategory !== "all" ||
    selectedCondition !== "all" ||
    selectedSharingType !== "all" ||
    selectedStatus !== "all" ||
    sortBy !== "newest";

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs mb-8 space-y-4">
      {/* Top Search Input & Sort */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search bar */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search textbooks, Casio fx-991EX, Arduino kits, lecture notes, authors..."
            className="w-full pl-11 pr-10 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-sm text-slate-900 placeholder:text-slate-400 transition"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              aria-label="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 self-end md:self-auto min-w-[200px]">
          <ArrowUpDown className="w-4 h-4 text-slate-500 flex-shrink-0" />
          <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full text-xs font-semibold py-3 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="newest">Newest Listed First</option>
            <option value="oldest">Oldest Listed First</option>
            <option value="title_asc">Title (A to Z)</option>
            <option value="title_desc">Title (Z to A)</option>
            <option value="views">Most Popular / Viewed</option>
          </select>
        </div>
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
        {/* Category */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full text-xs py-2 px-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            {CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
        </div>

        {/* Sharing Type */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Sharing Type
          </label>
          <select
            value={selectedSharingType}
            onChange={(e) => setSelectedSharingType(e.target.value)}
            className="w-full text-xs py-2 px-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="all">All Sharing Types</option>
            {SHARING_TYPES.map(st => (
              <option key={st.value} value={st.value}>{st.label}</option>
            ))}
          </select>
        </div>

        {/* Condition */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Condition
          </label>
          <select
            value={selectedCondition}
            onChange={(e) => setSelectedCondition(e.target.value)}
            className="w-full text-xs py-2 px-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="all">All Conditions</option>
            {CONDITIONS.map(cond => (
              <option key={cond.value} value={cond.value}>{cond.value}</option>
            ))}
          </select>
        </div>

        {/* Availability */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full text-xs py-2 px-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="all">All Statuses</option>
            <option value="Available">Available Now</option>
            <option value="Requested">Pending Request</option>
            <option value="Borrowed">Currently Borrowed</option>
          </select>
        </div>
      </div>

      {/* Results and Reset */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
        <span>
          Showing <strong className="text-slate-800 font-bold">{totalResults}</strong> academic resources
        </span>

        {isFiltered && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 hover:underline"
          >
            <X className="w-3.5 h-3.5" />
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
};
