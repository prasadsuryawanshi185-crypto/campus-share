import React from "react";
import { DollarSign, Recycle, Users2, GraduationCap, CheckCircle2 } from "lucide-react";
import { COLLEGE_NAME } from "../../utils/constants";

export const ImpactBenefits = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: "Student Affordability",
      desc: "An engineering student spends between ₹8,000 to ₹15,000 every year on textbooks, drawing tools, and calculators that are used for only one semester. CampusShare eliminates unnecessary expenditure.",
      highlight: "Save up to ₹15,000/yr"
    },
    {
      icon: Recycle,
      title: "Environmental Reuse",
      desc: "Promoting circular reuse inside campus drastically curtails paper consumption and electronics e-waste (calculators, breadboards, cables, sensor kits) by keeping useful items in active rotation.",
      highlight: "Zero Waste Initiative"
    },
    {
      icon: Users2,
      title: "Peer Collaboration",
      desc: "Fosters inter-branch bonding between CSE, IT, Electronics, Electrical, Mechanical, and Civil departments. Seniors mentor juniors through shared notes and project component handovers.",
      highlight: "Senior-Junior Mentorship"
    },
    {
      icon: GraduationCap,
      title: "Equal Learning Access",
      desc: "Every student gets equitable access to reference materials, regardless of economic background. No student falls behind in coursework due to lack of expensive physical tools.",
      highlight: "Academic Equity"
    }
  ];

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/70 border border-emerald-800/80 px-3 py-1 rounded-full">
            Community Engagement Program (CEP)
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Why Campus Resource Sharing Matters
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Built as part of the Community Engagement Program (CEP) at {COLLEGE_NAME} to address student affordability and foster an ethos of sustainable campus collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="bg-slate-850/80 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-slate-700 transition"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                    {b.highlight}
                  </span>
                  <h3 className="text-base font-bold text-white mb-2">
                    {b.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
