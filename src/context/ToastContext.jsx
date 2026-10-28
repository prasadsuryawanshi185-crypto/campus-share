import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success", duration = 4000) => {
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2, 4);
    setToasts(prev => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {/* Toast Container */}
      <div
        aria-live="polite"
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4 sm:px-0"
      >
        {toasts.map(toast => {
          let bg = "bg-white border-slate-200 text-slate-800";
          let icon = <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />;

          if (toast.type === "success") {
            bg = "bg-emerald-50 border-emerald-200 text-emerald-950";
            icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />;
          } else if (toast.type === "error") {
            bg = "bg-rose-50 border-rose-200 text-rose-950";
            icon = <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />;
          } else if (toast.type === "warning") {
            bg = "bg-amber-50 border-amber-200 text-amber-950";
            icon = <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />;
          }

          return (
            <div
              key={toast.id}
              role="status"
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg transition-all duration-300 animate-in slide-in-from-bottom-2 ${bg}`}
            >
              {icon}
              <div className="flex-1 text-sm font-medium leading-snug">
                {toast.message}
              </div>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-slate-700 transition p-0.5 rounded-md"
                aria-label="Dismiss notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
