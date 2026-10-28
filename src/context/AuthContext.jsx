import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db, isFirebaseConfigured } from "../services/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { KEYS, getLocalData, setLocalData, initializeLocalStore } from "../services/storageService";
import { INITIAL_DEMO_USERS } from "../services/demoData";
import { COLLEGE_DOMAIN } from "../utils/constants";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(!isFirebaseConfigured());
  const [domainRestriction, setDomainRestriction] = useState(true);

  useEffect(() => {
    initializeLocalStore();

    if (isFirebaseConfigured() && auth) {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          try {
            // Fetch extra profile data from Firestore
            const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
            if (userDoc.exists()) {
              setCurrentUser({ uid: firebaseUser.uid, email: firebaseUser.email, ...userDoc.data() });
            } else {
              setCurrentUser({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                fullName: firebaseUser.displayName || "WCE Student",
                role: "student",
              });
            }
          } catch (err) {
            console.error("Error reading Firestore profile:", err);
            setCurrentUser({ uid: firebaseUser.uid, email: firebaseUser.email, fullName: "WCE Student" });
          }
        } else {
          // If no Firebase session, check if demo mode user was stored
          const savedUser = getLocalData(KEYS.CURRENT_USER);
          setCurrentUser(savedUser || INITIAL_DEMO_USERS[0]);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // Local Demo Mode
      const savedUser = getLocalData(KEYS.CURRENT_USER);
      setCurrentUser(savedUser || INITIAL_DEMO_USERS[0]);
      setIsDemoMode(true);
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    if (isFirebaseConfigured() && auth && !isDemoMode) {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return res.user;
    }

    // Demo Mode Sign In
    const users = getLocalData(KEYS.USERS) || INITIAL_DEMO_USERS;
    const found = users.find(u => u.collegeEmail.toLowerCase() === email.trim().toLowerCase());
    if (!found) {
      throw new Error("No student account found with this college email address. Try one of the demo accounts or sign up!");
    }
    setCurrentUser(found);
    setLocalData(KEYS.CURRENT_USER, found);
    return found;
  };

  const register = async ({ fullName, collegeEmail, password, department, academicYear, prn }) => {
    // Validate college domain if restriction is on
    if (domainRestriction && !collegeEmail.toLowerCase().endsWith(COLLEGE_DOMAIN)) {
      throw new Error(`Registration restricted to verified college email (@${COLLEGE_DOMAIN}).`);
    }

    if (isFirebaseConfigured() && auth && !isDemoMode) {
      const res = await createUserWithEmailAndPassword(auth, collegeEmail, password);
      const profile = {
        uid: res.user.uid,
        fullName: fullName.trim(),
        collegeEmail: collegeEmail.trim().toLowerCase(),
        department,
        academicYear,
        prn: prn ? prn.trim().toUpperCase() : "",
        role: "student",
        createdAt: new Date().toISOString()
      };
      if (db) {
        await setDoc(doc(db, "users", res.user.uid), profile);
      }
      setCurrentUser(profile);
      return profile;
    }

    // Demo Mode Register
    const users = getLocalData(KEYS.USERS) || INITIAL_DEMO_USERS;
    const existing = users.find(u => u.collegeEmail.toLowerCase() === collegeEmail.trim().toLowerCase());
    if (existing) {
      throw new Error("An account with this college email is already registered.");
    }

    const newUser = {
      uid: "user-" + Date.now().toString(36),
      fullName: fullName.trim(),
      collegeEmail: collegeEmail.trim().toLowerCase(),
      department,
      academicYear,
      prn: prn ? prn.trim().toUpperCase() : `2026BTE${department.substring(0, 2).toUpperCase()}099`,
      role: "student",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80",
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    setLocalData(KEYS.USERS, users);
    setCurrentUser(newUser);
    setLocalData(KEYS.CURRENT_USER, newUser);
    return newUser;
  };

  const logout = async () => {
    if (isFirebaseConfigured() && auth && !isDemoMode) {
      await signOut(auth);
    }
    setCurrentUser(null);
    localStorage.removeItem(KEYS.CURRENT_USER);
  };

  const switchDemoUser = (userUid) => {
    const users = getLocalData(KEYS.USERS) || INITIAL_DEMO_USERS;
    const target = users.find(u => u.uid === userUid);
    if (target) {
      setCurrentUser(target);
      setLocalData(KEYS.CURRENT_USER, target);
      return target;
    }
    return null;
  };

  const updateProfile = async (updates) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
    setLocalData(KEYS.CURRENT_USER, updated);

    // Update in users list
    const users = getLocalData(KEYS.USERS) || INITIAL_DEMO_USERS;
    const idx = users.findIndex(u => u.uid === currentUser.uid);
    if (idx !== -1) {
      users[idx] = updated;
      setLocalData(KEYS.USERS, users);
    }

    if (isFirebaseConfigured() && db && !isDemoMode) {
      try {
        await setDoc(doc(db, "users", currentUser.uid), updates, { merge: true });
      } catch (err) {
        console.warn("Firestore profile update failed:", err);
      }
    }
    return updated;
  };

  const resetPassword = async (email) => {
    if (isFirebaseConfigured() && auth && !isDemoMode) {
      await sendPasswordResetEmail(auth, email);
      return true;
    }
    // Demo Mode simulation
    return true;
  };

  const toggleDemoMode = () => {
    setIsDemoMode(prev => !prev);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        isDemoMode,
        domainRestriction,
        setDomainRestriction,
        toggleDemoMode,
        login,
        register,
        logout,
        switchDemoUser,
        updateProfile,
        resetPassword,
        allDemoUsers: INITIAL_DEMO_USERS
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
