import React from "react";
import { ResourceCard } from "../resources/ResourceCard";
import { useResources } from "../../context/ResourceContext";
import { useAuth } from "../../context/AuthContext";
import { ArrowRight, Sparkles } from "lucide-react";

export const FeaturedResources = ({ onExploreAll, onViewDetails, onRequestBorrow }) => {
  const { resources } = useResources();
  const { currentUser } = useAuth();

  // Show first 6 active resources
  const featured = resources.slice(0, 6);

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Campus Highlights</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Featured Academic Resources
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Top items recently shared by students across WCE engineering departments.
            </p>
          </div>

          <button
            type="button"
            onClick={onExploreAll}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 group self-start sm:self-auto"
          >
            <span>View All ({resources.length}) Listings</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {featured.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-xs text-slate-500 border border-slate-200">
            No resources listed yet. Be the first to share!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(resource => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                onViewDetails={onViewDetails}
                onRequestBorrow={onRequestBorrow}
                currentUserId={currentUser?.uid}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
