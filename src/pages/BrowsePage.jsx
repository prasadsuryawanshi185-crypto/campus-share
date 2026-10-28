import React from "react";
import { ResourceCard } from "../components/resources/ResourceCard";
import { ResourceFilterBar } from "../components/resources/ResourceFilterBar";
import { useResources } from "../context/ResourceContext";
import { useAuth } from "../context/AuthContext";
import { PlusCircle, SearchX, RotateCcw } from "lucide-react";

export const BrowsePage = () => {
  const {
    filteredResources,
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
    setActiveResource,
    setIsRequestModalOpen,
    setIsAddModalOpen,
    openAuthModal,
    loading
  } = useResources();
  const { currentUser } = useAuth();

  const handleViewDetails = (resource) => {
    setActiveResource(resource);
  };

  const handleRequestBorrow = (resource) => {
    if (!currentUser) {
      openAuthModal("login");
    } else {
      setActiveResource(resource);
      setIsRequestModalOpen(true);
    }
  };

  const handleShareClick = () => {
    if (!currentUser) {
      openAuthModal("login");
    } else {
      setIsAddModalOpen(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Browse Academic Resources
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Discover peer-contributed textbooks, calculator kits, lab components, and notes at WCE Sangli.
          </p>
        </div>

        <button
          type="button"
          onClick={handleShareClick}
          className="self-start sm:self-auto px-4 py-2.5 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition flex items-center gap-1.5 active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Share a Resource</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <ResourceFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedCondition={selectedCondition}
        setSelectedCondition={setSelectedCondition}
        selectedSharingType={selectedSharingType}
        setSelectedSharingType={setSelectedSharingType}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
        clearFilters={clearFilters}
        totalResults={filteredResources.length}
      />

      {/* Resources Card Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 animate-pulse">
              <div className="h-44 bg-slate-200 rounded-xl" />
              <div className="h-4 bg-slate-200 rounded w-3/4" />
              <div className="h-3 bg-slate-200 rounded w-1/2" />
              <div className="h-8 bg-slate-200 rounded" />
            </div>
          ))}
        </div>
      ) : filteredResources.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center max-w-lg mx-auto space-y-4 shadow-xs">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto">
            <SearchX className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No matching resources found</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            We couldn't find any items matching your current search query and filters. Try removing some filters or searching with different keywords.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="px-4 py-2 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map(resource => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onViewDetails={handleViewDetails}
              onRequestBorrow={handleRequestBorrow}
              currentUserId={currentUser?.uid}
            />
          ))}
        </div>
      )}
    </div>
  );
};
