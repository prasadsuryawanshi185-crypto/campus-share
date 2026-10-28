import React from "react";
import { HeroSection } from "../components/landing/HeroSection";
import { CategoryGrid } from "../components/landing/CategoryGrid";
import { FeaturedResources } from "../components/landing/FeaturedResources";
import { HowItWorks } from "../components/landing/HowItWorks";
import { ImpactBenefits } from "../components/landing/ImpactBenefits";
import { useResources } from "../context/ResourceContext";
import { useAuth } from "../context/AuthContext";
import { PlusCircle, ArrowRight, BookOpen } from "lucide-react";

export const LandingPage = ({ setActivePage }) => {
  const { setSelectedCategory, setActiveResource, setIsRequestModalOpen, setIsAddModalOpen, openAuthModal } = useResources();
  const { currentUser } = useAuth();

  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    setActivePage("browse");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  const handleShareResource = () => {
    if (!currentUser) {
      openAuthModal("login");
    } else {
      setIsAddModalOpen(true);
    }
  };

  return (
    <div className="space-y-0">
      <HeroSection
        onExplore={() => {
          setActivePage("browse");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onShare={handleShareResource}
      />

      <CategoryGrid onSelectCategory={handleSelectCategory} />

      <FeaturedResources
        onExploreAll={() => {
          setActivePage("browse");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onViewDetails={handleViewDetails}
        onRequestBorrow={handleRequestBorrow}
      />

      <HowItWorks />

      <ImpactBenefits />

      {/* Pre-footer Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-indigo-900 text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
            Join 500+ Walchandites
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Have study resources sitting idle in your hostel or study room?
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Pass it forward to a junior or classmate. Make campus life more affordable, connected, and sustainable for everyone at WCE Sangli.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleShareResource}
              className="px-6 py-3 rounded-xl bg-white text-blue-900 hover:bg-slate-100 text-xs font-bold transition flex items-center gap-2 shadow-lg"
            >
              <PlusCircle className="w-4 h-4 text-blue-600" />
              <span>List an Item in 60 Seconds</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActivePage("browse");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-6 py-3 rounded-xl bg-blue-800/80 hover:bg-blue-800 text-white text-xs font-bold border border-blue-400/30 transition flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Browse Catalog</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
