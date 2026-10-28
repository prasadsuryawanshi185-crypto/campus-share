import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { DEPARTMENTS, ACADEMIC_YEARS, COLLEGE_DOMAIN } from "../../utils/constants";
import { LogIn, UserPlus, KeyRound, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

export const AuthModal = ({
  isOpen,
  onClose,
  initialTab = "login"
}) => {
  const { login, register, resetPassword, switchDemoUser, allDemoUsers, domainRestriction } = useAuth();
  const { addToast } = useToast();

  const [tab, setTab] = useState(initialTab); // 'login' | 'register' | 'forgot'
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form state
  const [fullName, setFullName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [academicYear, setAcademicYear] = useState(ACADEMIC_YEARS[2]);
  const [prn, setPrn] = useState("");

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      setSubmitting(true);
      await login(loginEmail, loginPassword);
      addToast("Welcome back to CampusShare!", "success");
      onClose();
    } catch (err) {
      setErrorMessage(err.message || "Invalid credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (domainRestriction && !regEmail.toLowerCase().endsWith(COLLEGE_DOMAIN)) {
      setErrorMessage(`Please use your verified college email ending with @${COLLEGE_DOMAIN}`);
      return;
    }

    try {
      setSubmitting(true);
      await register({
        fullName,
        collegeEmail: regEmail,
        password: regPassword,
        department,
        academicYear,
        prn
      });
      addToast("Account created successfully! Welcome to WCE CampusShare.", "success");
      onClose();
    } catch (err) {
      setErrorMessage(err.message || "Registration failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      setSubmitting(true);
      await resetPassword(forgotEmail);
      setForgotSent(true);
      addToast("Password reset instructions sent to your college inbox.", "info");
    } catch (err) {
      setErrorMessage(err.message || "Failed to send reset link.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickDemoLogin = (userUid) => {
    switchDemoUser(userUid);
    addToast("Logged in via Demo Account Sandbox.", "success");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={tab === "forgot" ? "Reset Password" : (tab === "login" ? "Student Login" : "Student Registration")}
      maxWidth="max-w-md"
    >
      <div className="space-y-4">
        {/* Tab Switcher */}
        {tab !== "forgot" && (
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => { setTab("login"); setErrorMessage(""); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                tab === "login" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setTab("register"); setErrorMessage(""); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                tab === "register" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              New Student Sign Up
            </button>
          </div>
        )}

        {/* Error banner */}
        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        {tab === "login" && (
          <form onSubmit={handleLoginSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                College Email Address
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder={`student@${COLLEGE_DOMAIN}`}
                className="w-full text-xs py-2.5 px-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-white"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">Password</label>
                <button
                  type="button"
                  onClick={() => setTab("forgot")}
                  className="text-[11px] text-blue-600 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs py-2.5 px-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
            >
              <LogIn className="w-4 h-4" />
              <span>{submitting ? "Signing in..." : "Sign In with College ID"}</span>
            </button>
          </form>
        )}

        {/* Register Form */}
        {tab === "register" && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Rohit Patil"
                className="w-full text-xs py-2 px-3 rounded-xl border border-slate-200 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                WCE College Email * (@{COLLEGE_DOMAIN})
              </label>
              <input
                type="email"
                required
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder={`yourname@${COLLEGE_DOMAIN}`}
                className="w-full text-xs py-2 px-3 rounded-xl border border-slate-200 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Password *</label>
              <input
                type="password"
                required
                minLength={6}
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full text-xs py-2 px-3 rounded-xl border border-slate-200 bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Department</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full text-xs py-2 px-2 rounded-xl border border-slate-200 bg-white"
                >
                  {DEPARTMENTS.map(d => (
                    <option key={d} value={d}>{d.split(" ")[0]}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Academic Year</label>
                <select
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className="w-full text-xs py-2 px-2 rounded-xl border border-slate-200 bg-white"
                >
                  {ACADEMIC_YEARS.map(y => (
                    <option key={y} value={y}>{y.split(" ")[0]}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">PRN / Student ID</label>
              <input
                type="text"
                value={prn}
                onChange={(e) => setPrn(e.target.value)}
                placeholder="e.g. 2023BTECS00042"
                className="w-full text-xs py-2 px-3 rounded-xl border border-slate-200 bg-white uppercase"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>{submitting ? "Registering..." : "Create Student Account"}</span>
            </button>
          </form>
        )}

        {/* Forgot Password Flow */}
        {tab === "forgot" && (
          <div className="space-y-3.5">
            {forgotSent ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="text-xs font-bold text-emerald-900">Recovery Email Sent</h4>
                <p className="text-xs text-emerald-700">
                  Please check your inbox at <strong>{forgotEmail}</strong> for the password reset link.
                </p>
                <button
                  type="button"
                  onClick={() => { setTab("login"); setForgotSent(false); }}
                  className="text-xs font-bold text-blue-600 hover:underline pt-2 block"
                >
                  &larr; Back to Log In
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-3">
                <p className="text-xs text-slate-500">
                  Enter your registered Walchand college email address to receive password reset instructions.
                </p>
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder={`student@${COLLEGE_DOMAIN}`}
                  className="w-full text-xs py-2.5 px-3 rounded-xl border border-slate-200 bg-white"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition"
                >
                  {submitting ? "Sending..." : "Send Reset Link"}
                </button>
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setTab("login")}
                    className="text-xs text-slate-500 hover:text-slate-800"
                  >
                    Cancel and return to login
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Quick Demo Logins Section */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Instant Demo Logins (1-Click Evaluation):</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-[11px]">
            {allDemoUsers.map(user => (
              <button
                key={user.uid}
                type="button"
                onClick={() => handleQuickDemoLogin(user.uid)}
                className="p-2 text-left bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-lg transition group"
              >
                <div className="font-semibold text-slate-800 group-hover:text-blue-700 truncate">
                  {user.fullName}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {user.department.split(" ")[0]} • {user.role === "admin" ? "Admin" : user.academicYear.split(" ")[0]}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
