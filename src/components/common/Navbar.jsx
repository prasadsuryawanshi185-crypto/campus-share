import React, { useState } from "react";
import {
  BookOpen,
  PlusCircle,
  Bell,
  User,
  LogOut,
  Shield,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Database,
  ExternalLink
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useResources } from "../../context/ResourceContext";
import { COLLEGE_SHORT } from "../../utils/constants";

export const Navbar = ({ activePage, setActivePage }) => {
  const { currentUser, isDemoMode, logout, switchDemoUser, allDemoUsers } = useAuth();
  const { notifications, setIsAddModalOpen, openAuthModal, handleMarkNotificationRead, handleMarkAllNotificationsRead } = useResources();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [demoSwitcherOpen, setDemoSwitcherOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNavClick = (page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      {/* Top Campus Banner */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-slate-200">
              Walchand College of Engineering, Sangli
            </span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden sm:inline text-slate-400">
              Community Engagement Program (CEP)
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Environment Badge */}
            <div className="flex items-center gap-1.5 bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[11px] font-mono">
              <Database className="w-3 h-3 text-emerald-400" />
              <span>{isDemoMode ? "Demo Sandbox" : "Firebase Cloud"}</span>
            </div>

            {/* Quick Demo Switcher trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setDemoSwitcherOpen(!demoSwitcherOpen)}
                className="flex items-center gap-1 text-[11px] bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 px-2 py-0.5 rounded transition"
              >
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span className="hidden md:inline">Switch Demo User:</span>
                <span className="font-semibold text-white truncate max-w-[100px]">
                  {currentUser ? currentUser.fullName.split(" ")[0] : "Select"}
                </span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {demoSwitcherOpen && (
                <div
                  className="absolute right-0 mt-1 w-64 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs animate-in fade-in"
                  onMouseLeave={() => setDemoSwitcherOpen(false)}
                >
                  <div className="px-3 py-1.5 border-b border-slate-100 font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
                    Switch Active Test Account
                  </div>
                  {allDemoUsers.map(u => (
                    <button
                      key={u.uid}
                      type="button"
                      onClick={() => {
                        switchDemoUser(u.uid);
                        setDemoSwitcherOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-slate-50 transition ${
                        currentUser?.uid === u.uid ? "bg-blue-50/70 font-semibold text-blue-700" : ""
                      }`}
                    >
                      <img
                        src={u.avatar}
                        alt=""
                        className="w-6 h-6 rounded-full object-cover border border-slate-200"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="truncate">{u.fullName}</div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {u.department.split(" ")[0]} • {u.role === "admin" ? "Admin" : u.academicYear.split(" ")[0]}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & College Badge */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-900 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1.5">
                  CampusShare
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                    {COLLEGE_SHORT}
                  </span>
                </span>
                <span className="block text-[11px] text-slate-500 font-medium">
                  Resource Sharing Network
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
            <button
              type="button"
              onClick={() => handleNavClick("home")}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition ${
                activePage === "home"
                  ? "text-blue-700 bg-blue-50"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("browse")}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition ${
                activePage === "browse"
                  ? "text-blue-700 bg-blue-50"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Browse Resources
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("about")}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition ${
                activePage === "about"
                  ? "text-blue-700 bg-blue-50"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              About CEP
            </button>

            {currentUser && (
              <button
                type="button"
                onClick={() => handleNavClick("dashboard")}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition ${
                  activePage === "dashboard"
                    ? "text-blue-700 bg-blue-50"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                My Dashboard
              </button>
            )}

            {currentUser?.role === "admin" && (
              <button
                type="button"
                onClick={() => handleNavClick("admin")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition ${
                  activePage === "admin"
                    ? "bg-purple-100 text-purple-800"
                    : "text-purple-700 hover:bg-purple-50"
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                Admin
              </button>
            )}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Share Resource Button */}
            <button
              type="button"
              onClick={() => {
                if (!currentUser) {
                  openAuthModal("login");
                } else {
                  setIsAddModalOpen(true);
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow transition active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Share Resource</span>
            </button>

            {/* Notifications Dropdown */}
            {currentUser && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                  className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl relative transition"
                  aria-label="View notifications"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {notifDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in"
                    onMouseLeave={() => setNotifDropdownOpen(false)}
                  >
                    <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Notifications ({notifications.length})
                      </span>
                      {unreadCount > 0 && (
                        <button
                          type="button"
                          onClick={() => handleMarkAllNotificationsRead()}
                          className="text-[11px] text-blue-600 hover:underline font-medium"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>

                    <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                      {notifications.length === 0 ? (
                        <div className="p-6 text-center text-xs text-slate-500">
                          No notifications yet.
                        </div>
                      ) : (
                        notifications.slice(0, 5).map(n => (
                          <div
                            key={n.id}
                            onClick={() => {
                              handleMarkNotificationRead(n.id);
                              setActivePage("dashboard");
                              setNotifDropdownOpen(false);
                            }}
                            className={`p-3 text-xs cursor-pointer hover:bg-slate-50 transition ${
                              !n.read ? "bg-blue-50/50 font-medium" : "text-slate-600"
                            }`}
                          >
                            <div className="font-semibold text-slate-900 mb-0.5">{n.title}</div>
                            <div className="text-slate-600 line-clamp-2">{n.message}</div>
                            <div className="text-[10px] text-slate-400 mt-1">
                              {new Date(n.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="px-3 pt-2 border-t border-slate-100 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setActivePage("dashboard");
                          setNotifDropdownOpen(false);
                        }}
                        className="text-xs text-blue-600 font-semibold hover:underline"
                      >
                        View all in Dashboard &rarr;
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* User Profile or Login */}
            {currentUser ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition"
                  aria-label="User menu"
                >
                  <img
                    src={currentUser.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80"}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover border border-slate-300"
                  />
                  <span className="text-sm font-semibold text-slate-800 hidden lg:inline max-w-[120px] truncate">
                    {currentUser.fullName}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-sm font-bold text-slate-900 truncate">{currentUser.fullName}</p>
                      <p className="text-xs text-slate-500 truncate">{currentUser.collegeEmail}</p>
                      <span className="inline-block mt-1 text-[10px] font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                        {currentUser.department?.split(" ")[0] || "Student"} • {currentUser.academicYear?.split(" ")[0]}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setActivePage("dashboard");
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      Student Dashboard
                    </button>

                    {currentUser.role === "admin" && (
                      <button
                        type="button"
                        onClick={() => {
                          setActivePage("admin");
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-purple-700 hover:bg-purple-50 flex items-center gap-2"
                      >
                        <Shield className="w-4 h-4 text-purple-500" />
                        Admin Panel
                      </button>
                    )}

                    <div className="border-t border-slate-100 my-1" />

                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openAuthModal("login")}
                  className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition"
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={() => openAuthModal("register")}
                  className="px-4 py-2 text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="p-2 text-blue-600 bg-blue-50 rounded-xl"
              aria-label="Add resource"
            >
              <PlusCircle className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2">
          <button
            type="button"
            onClick={() => handleNavClick("home")}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-base font-semibold ${
              activePage === "home" ? "bg-blue-50 text-blue-700" : "text-slate-700"
            }`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => handleNavClick("browse")}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-base font-semibold ${
              activePage === "browse" ? "bg-blue-50 text-blue-700" : "text-slate-700"
            }`}
          >
            Browse Resources
          </button>
          <button
            type="button"
            onClick={() => handleNavClick("about")}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-base font-semibold ${
              activePage === "about" ? "bg-blue-50 text-blue-700" : "text-slate-700"
            }`}
          >
            About CEP
          </button>

          {currentUser && (
            <button
              type="button"
              onClick={() => handleNavClick("dashboard")}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-base font-semibold ${
                activePage === "dashboard" ? "bg-blue-50 text-blue-700" : "text-slate-700"
              }`}
            >
              Student Dashboard
            </button>
          )}

          {currentUser?.role === "admin" && (
            <button
              type="button"
              onClick={() => handleNavClick("admin")}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-base font-semibold ${
                activePage === "admin" ? "bg-purple-50 text-purple-700" : "text-purple-700"
              }`}
            >
              Admin Dashboard
            </button>
          )}

          <div className="pt-3 border-t border-slate-100">
            {currentUser ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-xl">
                  <img
                    src={currentUser.avatar}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-bold text-slate-900">{currentUser.fullName}</div>
                    <div className="text-xs text-slate-500">{currentUser.collegeEmail}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-rose-600 font-semibold"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    openAuthModal("login");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-center text-sm font-semibold border border-slate-300 rounded-xl text-slate-800"
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    openAuthModal("register");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-center text-sm font-semibold bg-blue-600 text-white rounded-xl"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
