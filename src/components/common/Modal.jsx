import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-2xl",
  showClose = true,
}) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  // Handle native ESC and close event
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e) => {
      e.preventDefault();
      onClose();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [onClose]);

  // Light dismiss: Close on outside click (click on dialog backdrop)
  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      aria-labelledby="dialog-heading"
      className={`p-0 bg-transparent text-slate-900 border-none outline-none m-auto shadow-2xl rounded-2xl w-[92vw] ${maxWidth} overflow-hidden`}
    >
      <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        {(title || showClose) && (
          <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-100 bg-slate-50/70">
            {title ? (
              <h2
                id="dialog-heading"
                className="text-lg font-bold text-slate-900 tracking-tight"
              >
                {title}
              </h2>
            ) : <span />}
            {showClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </dialog>
  );
};
