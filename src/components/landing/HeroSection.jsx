import React, { useState } from "react";
import { Search, ArrowRight, PlusCircle, BookOpen, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useResources } from "../../context/ResourceContext";
import { COLLEGE_NAME, COLLEGE_SHORT } from "../../utils/constants";

export const HeroSection = ({ onExplore, onShare }) => {
  const { searchQuery, setSearchQuery } = useResources();
  const [localQuery, setLocalQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localQuery.trim()) {
      setSearchQuery(localQuery.trim());
      onExplore();
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-blue-50/60 via-white to-slate-50">
      {/* Subtle decorative background circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-800 text-xs font-bold border border-blue-200/60 shadow-xs animate-in fade-in">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
            <span>Community Engagement Program (CEP) Initiative • {COLLEGE_SHORT}</span>
          </div>

          {/* Main Hero Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Share Resources. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800">
              Save Money.
            </span>{" "}
            Learn Together.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            The official peer-to-peer student resource sharing network for <strong>Walchand College of Engineering, Sangli</strong>. Borrow textbooks, scientific calculators, lab gear, and topper notes from fellow students instead of purchasing everything yourself.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-2xl mx-auto bg-white p-2 rounded-2xl shadow-xl shadow-blue-900/5 border border-slate-200/90 flex flex-col sm:flex-row items-center gap-2"
          >
            <div className="relative flex-1 w-full flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5" />
              <input
                type="text"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder="Search CLRS, Casio fx-991EX, Arduino kit, GATE notes..."
                className="w-full pl-11 pr-4 py-3 text-sm rounded-xl focus:outline-none text-slate-900 placeholder:text-slate-400"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center justify-center gap-2 flex-shrink-0 shadow-sm"
            >
              <span>Search Resources</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={onExplore}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-2 shadow-sm"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore All Resources</span>
            </button>
            <button
              type="button"
              onClick={onShare}
              className="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-blue-700 border border-blue-200 text-xs font-bold transition flex items-center gap-2 shadow-xs"
            >
              <PlusCircle className="w-4 h-4 text-blue-600" />
              <span>Share a Resource</span>
            </button>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="mt-16 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 p-4 sm:p-6 bg-white rounded-3xl border border-slate-200/90 shadow-lg shadow-slate-100">
          <div className="text-center p-3 border-r border-slate-100 last:border-none">
            <div className="text-2xl sm:text-3xl font-black text-slate-900">500+</div>
            <div className="text-xs text-slate-500 font-medium mt-1">Study Items Shared</div>
          </div>
          <div className="text-center p-3 border-r border-slate-100 last:border-none">
            <div className="text-2xl sm:text-3xl font-black text-emerald-600">&#8377;1.8 Lakh+</div>
            <div className="text-xs text-slate-500 font-medium mt-1">Saved by Students</div>
          </div>
          <div className="text-center p-3 border-r border-slate-100 last:border-none">
            <div className="text-2xl sm:text-3xl font-black text-blue-600">6 Branches</div>
            <div className="text-xs text-slate-500 font-medium mt-1">WCE Engineering Depts</div>
          </div>
          <div className="text-center p-3">
            <div className="text-2xl sm:text-3xl font-black text-indigo-600">100%</div>
            <div className="text-xs text-slate-500 font-medium mt-1">Verified Peers</div>
          </div>
        </div>
      </div>
    </section>
  );
};
