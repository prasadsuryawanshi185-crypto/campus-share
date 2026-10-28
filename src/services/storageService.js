import {
  INITIAL_DEMO_USERS,
  INITIAL_DEMO_RESOURCES,
  INITIAL_DEMO_REQUESTS,
  INITIAL_DEMO_NOTIFICATIONS,
  INITIAL_DEMO_REPORTS
} from "./demoData";

const KEYS = {
  USERS: "campus_share_users",
  RESOURCES: "campus_share_resources",
  REQUESTS: "campus_share_requests",
  NOTIFICATIONS: "campus_share_notifications",
  REPORTS: "campus_share_reports",
  CURRENT_USER: "campus_share_current_user",
  FORCE_DEMO: "campus_share_force_demo",
};

export const initializeLocalStore = () => {
  if (!localStorage.getItem(KEYS.USERS)) {
    localStorage.setItem(KEYS.USERS, JSON.stringify(INITIAL_DEMO_USERS));
  }
  if (!localStorage.getItem(KEYS.RESOURCES)) {
    localStorage.setItem(KEYS.RESOURCES, JSON.stringify(INITIAL_DEMO_RESOURCES));
  }
  if (!localStorage.getItem(KEYS.REQUESTS)) {
    localStorage.setItem(KEYS.REQUESTS, JSON.stringify(INITIAL_DEMO_REQUESTS));
  }
  if (!localStorage.getItem(KEYS.NOTIFICATIONS)) {
    localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_DEMO_NOTIFICATIONS));
  }
  if (!localStorage.getItem(KEYS.REPORTS)) {
    localStorage.setItem(KEYS.REPORTS, JSON.stringify(INITIAL_DEMO_REPORTS));
  }
  if (!localStorage.getItem(KEYS.CURRENT_USER)) {
    // Default logged in user for immediate demo experience: Rohit Patil (CSE 3rd Year)
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(INITIAL_DEMO_USERS[0]));
  }
};

export const getLocalData = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return null;
  }
};

export const setLocalData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Error saving ${key} to localStorage:`, err);
  }
};

export const resetLocalStore = () => {
  localStorage.setItem(KEYS.USERS, JSON.stringify(INITIAL_DEMO_USERS));
  localStorage.setItem(KEYS.RESOURCES, JSON.stringify(INITIAL_DEMO_RESOURCES));
  localStorage.setItem(KEYS.REQUESTS, JSON.stringify(INITIAL_DEMO_REQUESTS));
  localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_DEMO_NOTIFICATIONS));
  localStorage.setItem(KEYS.REPORTS, JSON.stringify(INITIAL_DEMO_REPORTS));
  localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(INITIAL_DEMO_USERS[0]));
};

export { KEYS };
