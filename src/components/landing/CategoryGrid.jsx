import React from "react";
import { BookOpen, FileText, Calculator, FlaskConical, Cpu, Package, ArrowRight } from "lucide-react";
import { CATEGORIES } from "../../utils/constants";
import { useResources } from "../../context/ResourceContext";

const ICON_MAP = {
  BookOpen: BookOpen,
  FileText: FileText,
  Calculator: Calculator,
  FlaskConical: FlaskConical,
  Cpu: Cpu,
  Package: Package,
};

export const CategoryGrid = ({ onSelectCategory }) => {
  const { resources } = useResources();

  const getCategoryCount = (catId) => {
    return resources.filter(r => r.category === catId && r.status === "Available").length;
  };

  const categoriesToShow = CATEGORIES.filter(c => c.id !== "all");

  return (
    <section className="py-16 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Explore Categories
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Academic Resources Ready for You
          </h2>
          <p className="text-sm text-slate-500">
            Find items by category to borrow for your semester, mid-terms, practicals, or mini-projects.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesToShow.map(cat => {
            const Icon = ICON_MAP[cat.icon] || Package;
            const count = getCategoryCount(cat.id);

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="group p-6 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-blue-300 hover:shadow-lg hover:shadow-blue-900/5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-700 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {cat.label}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {cat.id === "Books" && "Core engineering textbooks, reference guides, GATE question banks."}
                    {cat.id === "Notes" && "Color-coded topper notes, previous exam question papers with solutions."}
                    {cat.id === "Calculators" && "Casio fx-991EX ClassWiz, TI scientific & graphing calculators for exams."}
                    {cat.id === "Lab Equipment" && "Oscilloscope probes, digital multimeters, breadboards, breadboard wires."}
                    {cat.id === "Project Components" && "Arduino Uno, ESP32, Raspberry Pi, sensor kits, stepper motors."}
                    {cat.id === "Other" && "Engineering drawing instruments, aprons, lab manuals, workshop gear."}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                  <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    {count} Available Now
                  </span>
                  <span className="text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Browse</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
