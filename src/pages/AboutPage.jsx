import React from "react";
import {
  BookOpen,
  Target,
  Users,
  Award,
  Sparkles,
  HelpCircle,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  MapPin
} from "lucide-react";
import { COLLEGE_NAME, COLLEGE_SHORT, CEP_TITLE } from "../utils/constants";

export const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
          <span>{CEP_TITLE}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          About CampusShare — WCE Sangli
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Empowering engineering students through peer-driven resource reuse, affordability, and academic solidarity at {COLLEGE_NAME}.
        </p>
      </div>

      {/* Problem Statement Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-rose-700">
          <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center font-bold">
            !
          </div>
          <h2 className="text-lg font-bold">The Problem Statement</h2>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">
          Throughout an engineering degree, students are required to procure specialized textbooks, costly scientific calculators (such as Casio ClassWiz fx-991EX), specialized lab components (DSO probes, multimeters, Arduino microcontrollers), and notes. Many of these resources are needed for only a single 4-month semester or even an exam week.
        </p>
        <p className="text-sm text-slate-700 leading-relaxed">
          Simultaneously, senior students possess these identical materials stored unused in their hostels and rooms after completing their semesters. Without a structured campus exchange mechanism, students either spend thousands of rupees purchasing new items or struggle academically due to lack of immediate access.
        </p>
      </div>

      {/* Proposed Solution Card */}
      <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl p-8 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-blue-300">
          <Sparkles className="w-6 h-6" />
          <h2 className="text-lg font-bold text-white">Our Proposed Solution</h2>
        </div>
        <p className="text-sm text-blue-100 leading-relaxed">
          <strong>CampusShare</strong> provides a centralized, authenticated platform exclusive to Walchand College of Engineering students. It enables students to list resources they are willing to lend, donate, or exchange, check real-time availability, coordinate campus pick-ups, and track returns seamlessly.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs">
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <div className="font-bold text-emerald-400 mb-1">&#10003; 100% Peer-to-Peer</div>
            <div className="text-slate-300">Direct student-to-student handover at campus landmarks.</div>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <div className="font-bold text-blue-300 mb-1">&#10003; Zero Hidden Charges</div>
            <div className="text-slate-300">Resources are lent for free or donated to juniors.</div>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <div className="font-bold text-purple-300 mb-1">&#10003; Safe In-App Requests</div>
            <div className="text-slate-300">Personal contact details remain protected from web crawlers.</div>
          </div>
        </div>
      </div>

      {/* Objectives & Expected Outcomes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Objectives */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-blue-700">
            <Target className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-900">Project Objectives</h3>
          </div>
          <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span><strong>Reduce Financial Burden:</strong> Lower semester expenses for financially disadvantaged engineering students.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span><strong>Encourage Circular Campus Economy:</strong> Prolong physical lifespan of academic books and lab devices to minimize waste.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span><strong>Foster Inter-Branch Mentorship:</strong> Connect senior students across CSE, IT, Electronics, Electrical, Mechanical, and Civil with juniors.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span><strong>Accountability & Reliability:</strong> Introduce clear return timelines and status workflows to ensure borrowed items are returned safely.</span>
            </li>
          </ul>
        </div>

        {/* Expected Outcomes */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-emerald-700">
            <Award className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-900">Expected Outcomes</h3>
          </div>
          <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>Over <strong>500+ active academic resources</strong> kept in continuous campus circulation every academic term.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>Estimated cumulative savings of <strong>&#8377;2,50,000+</strong> across participating student cohorts per academic year.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>Drastic reduction in discarded photocopied notes and unutilized laboratory hardware kits.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>Strengthened sense of community responsibility, fulfilling the core mandate of the Community Engagement Program (CEP).</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Target Beneficiaries */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-slate-900">
          <Users className="w-5 h-5 text-blue-600" />
          <h3 className="text-base font-bold">Target Beneficiaries</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-white rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-1">First & Second Year Juniors</h4>
            <p className="text-slate-500 leading-relaxed">
              Facing sudden expenses for basic engineering subjects (Mechanics, Graphics, Physics Lab, Basic Electrical) who benefit from free topper notes and loaner kits.
            </p>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-1">Mini-Project Cohorts</h4>
            <p className="text-slate-500 leading-relaxed">
              Student teams requiring short-term Arduino, ESP32, sensors, and multimeter tools without having to purchase one-time kits.
            </p>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-1">Graduating Seniors</h4>
            <p className="text-slate-500 leading-relaxed">
              Students preparing to vacate campus who want their books and project components to pass forward productively rather than being discarded.
            </p>
          </div>
        </div>
      </div>

      {/* Institutional CEP Footnote */}
      <div className="p-6 bg-blue-50/70 border border-blue-200/80 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-950">
        <div className="space-y-1">
          <div className="font-bold text-blue-900 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-blue-700" />
            <span>Walchand College of Engineering, Sangli</span>
          </div>
          <p className="text-blue-800">
            Autonomous Engineering Institute established in 1947. Approved by AICTE, affiliated to Shivaji University, Kolhapur.
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <span className="font-mono text-[11px] bg-white text-blue-800 px-3 py-1.5 rounded-lg border border-blue-200 font-bold">
            CEP Batch 2026
          </span>
        </div>
      </div>
    </div>
  );
};
