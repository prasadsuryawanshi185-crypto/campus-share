export const COLLEGE_NAME = "Walchand College of Engineering, Sangli";
export const COLLEGE_SHORT = "WCE Sangli";
export const COLLEGE_DOMAIN = "walchandsangli.ac.in";
export const CEP_TITLE = "Community Engagement Program (CEP)";

export const CATEGORIES = [
  { id: "all", label: "All Categories", icon: "Layers" },
  { id: "Books", label: "Academic Books & Textbooks", icon: "BookOpen" },
  { id: "Notes", label: "Handwritten & Digital Notes", icon: "FileText" },
  { id: "Calculators", label: "Scientific Calculators", icon: "Calculator" },
  { id: "Lab Equipment", label: "Lab Equipment & Toolkits", icon: "FlaskConical" },
  { id: "Project Components", label: "Project Components & IoT", icon: "Cpu" },
  { id: "Other", label: "Other Academic Gear", icon: "Package" },
];

export const DEPARTMENTS = [
  "Computer Science and Engineering (CSE)",
  "Information Technology (IT)",
  "Electronics Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Applied Science / General Engineering"
];

export const ACADEMIC_YEARS = [
  "First Year (F.Y. B.Tech)",
  "Second Year (S.Y. B.Tech)",
  "Third Year (T.Y. B.Tech)",
  "Final Year B.Tech",
  "M.Tech / Research Scholar"
];

export const CONDITIONS = [
  { value: "Like New", label: "Like New (Flawless, crisp pages/clean kit)", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  { value: "Good", label: "Good (Minor highlights or minor cosmetic wear)", color: "text-blue-700 bg-blue-50 border-blue-200" },
  { value: "Fair", label: "Fair (Noticeable wear, fully usable)", color: "text-amber-700 bg-amber-50 border-amber-200" },
];

export const SHARING_TYPES = [
  { value: "Borrow", label: "Borrow & Return", badge: "Borrow", desc: "Lend for a semester or exam session and return." },
  { value: "Free to Keep", label: "Free to Keep (Donation)", badge: "Donation", desc: "Pass it forward permanently to a junior." },
  { value: "Exchange", label: "Resource Exchange", badge: "Exchange", desc: "Swap for another textbook or toolkit." },
];

export const STATUS_TYPES = {
  AVAILABLE: "Available",
  REQUESTED: "Requested",
  BORROWED: "Borrowed",
  UNAVAILABLE: "Unavailable",
};

export const CAMPUS_PICKUP_POINTS = [
  "Central Library Entrance",
  "CCF (Central Computing Facility)",
  "Department Main Porch",
  "Saraswati Statue / Quadrangle",
  "Hostel Mess & Common Hall",
  "Student Recreation Centre (SRC)"
];
