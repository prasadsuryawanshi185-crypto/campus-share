import React, { useState } from "react";
import { ToastProvider } from "./context/ToastContext";
import { AuthProvider } from "./context/AuthContext";
import { ResourceProvider, useResources } from "./context/ResourceContext";
import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/common/Footer";
import { LandingPage } from "./pages/LandingPage";
import { BrowsePage } from "./pages/BrowsePage";
import { AboutPage } from "./pages/AboutPage";
import { StudentDashboard } from "./components/dashboard/StudentDashboard";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { ResourceDetailModal } from "./components/resources/ResourceDetailModal";
import { BorrowRequestModal } from "./components/resources/BorrowRequestModal";
import { AddResourceModal } from "./components/resources/AddResourceModal";
import { AuthModal } from "./components/auth/AuthModal";

function MainContent() {
  const [activePage, setActivePage] = useState("home"); // 'home' | 'browse' | 'about' | 'dashboard' | 'admin'

  const {
    activeResource,
    setActiveResource,
    isRequestModalOpen,
    setIsRequestModalOpen,
    isAddModalOpen,
    setIsAddModalOpen,
    editingResource,
    setEditingResource,
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalTab
  } = useResources();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white font-sans antialiased">
      {/* Primary Navigation */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Pages Switcher */}
      <main className="flex-1">
        {activePage === "home" && <LandingPage setActivePage={setActivePage} />}
        {activePage === "browse" && <BrowsePage />}
        {activePage === "about" && <AboutPage />}
        {activePage === "dashboard" && <StudentDashboard />}
        {activePage === "admin" && <AdminDashboard />}
      </main>

      {/* Global Modals */}
      {/* 1. Resource Details Modal */}
      <ResourceDetailModal
        resource={activeResource}
        isOpen={Boolean(activeResource && !isRequestModalOpen)}
        onClose={() => setActiveResource(null)}
        onRequestBorrow={(res) => {
          setActiveResource(res);
          setIsRequestModalOpen(true);
        }}
      />

      {/* 2. Borrow Request Modal */}
      <BorrowRequestModal
        resource={activeResource}
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
      />

      {/* 3. Add / Edit Resource Modal */}
      <AddResourceModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingResource(null);
        }}
        initialData={editingResource}
      />

      {/* 4. Student Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialTab={authModalTab}
      />

      {/* Platform Footer */}
      <Footer setActivePage={setActivePage} />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <ResourceProvider>
          <MainContent />
        </ResourceProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
