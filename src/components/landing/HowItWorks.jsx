import React from "react";
import { Search, MessageSquare, RotateCcw, ShieldCheck, MapPin } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      icon: Search,
      title: "1. Find a Resource",
      desc: "Search by course title, author, or equipment type. Filter by condition, department, or sharing preference (Borrow, Free Donation, Exchange).",
      tag: "Catalog Discovery"
    },
    {
      step: "02",
      icon: MessageSquare,
      title: "2. Contact Its Owner",
      desc: "Submit an in-app borrow request specifying your required return date and select a convenient campus pickup point like the WCE Central Library or CCF.",
      tag: "Safe Student Request"
    },
    {
      step: "03",
      icon: RotateCcw,
      title: "3. Borrow Responsibly & Return",
      desc: "Meet on campus, inspect the item together, use it for your exams or lab assignments, and return it safely so other students can benefit.",
      tag: "Community Honor"
    }
  ];

  return (
    <section className="py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Simple 3-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            How CampusShare Works
          </h2>
          <p className="text-sm text-slate-500">
            A responsible, transparent peer borrowing system designed exclusively for college students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="relative bg-slate-50/70 rounded-3xl p-8 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-slate-200 font-mono">
                      {s.step}
                    </span>
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/70 px-2.5 py-0.5 rounded-full inline-block mb-3">
                    {s.tag}
                  </span>

                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Campus-verified transactions</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
