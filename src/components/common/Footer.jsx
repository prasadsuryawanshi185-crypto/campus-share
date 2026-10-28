import React from "react";
import { BookOpen, Heart, ShieldCheck, Mail, MapPin, ExternalLink } from "lucide-react";
import { COLLEGE_NAME, COLLEGE_SHORT } from "../../utils/constants";

export const Footer = ({ setActivePage }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Platform & College Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                CampusShare
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              An institutional peer-to-peer resource sharing platform built under the Community Engagement Program (CEP) for students of Walchand College of Engineering, Sangli.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Vishrambag, Sangli, Maharashtra 416415</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Platform Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => { setActivePage("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="hover:text-white transition"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { setActivePage("browse"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="hover:text-white transition"
                >
                  Browse Academic Resources
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { setActivePage("about"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="hover:text-white transition"
                >
                  About CEP Problem Statement
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { setActivePage("dashboard"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="hover:text-white transition"
                >
                  Student Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Resource Categories */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Supported Resources
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>• Engineering Textbooks & Reference Guides</li>
              <li>• Handwritten Topper Notes & Question Banks</li>
              <li>• Casio & TI Scientific Calculators</li>
              <li>• Multimeter & Oscilloscope Lab Gear</li>
              <li>• Arduino, Raspberry Pi & IoT Sensors</li>
              <li>• Mini-project hardware components</li>
            </ul>
          </div>

          {/* Col 4: CEP Objectives */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              CEP & Sustainability
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Aligned with UN Sustainable Development Goals:
            </p>
            <div className="space-y-2">
              <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60 text-xs">
                <span className="font-bold text-emerald-400">SDG 4:</span> Quality Education & Equitable Access
              </div>
              <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60 text-xs">
                <span className="font-bold text-blue-400">SDG 12:</span> Responsible Consumption & Circular Reuse
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            &copy; {new Date().getFullYear()} {COLLEGE_NAME}. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            Developed with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> by WCE Engineering Students for CEP
          </div>
        </div>
      </div>
    </footer>
  );
};
