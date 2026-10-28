# CampusShare — Student Resource Sharing Platform
### Walchand College of Engineering, Sangli | Community Engagement Program (CEP)

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-2ea44f?style=for-the-badge&logo=github)](https://prasadsuryawanshi185-crypto.github.io/campus-share/)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/prasadsuryawanshi185-crypto/campus-share)

[![React 19](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF.svg)](https://vite.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/TailwindCSS-v4-38B2AC.svg)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth%20%26%20Firestore-FFA611.svg)](https://firebase.google.com/)

> **Live Production Website:** [https://prasadsuryawanshi185-crypto.github.io/campus-share/](https://prasadsuryawanshi185-crypto.github.io/campus-share/)  
> **Source Repository:** [https://github.com/prasadsuryawanshi185-crypto/campus-share](https://github.com/prasadsuryawanshi185-crypto/campus-share)

---

## 1. Project Overview

**CampusShare** is a full-stack, responsive web application designed for students at **Walchand College of Engineering (WCE), Sangli**. Built under the **Community Engagement Program (CEP)**, it enables students to share, borrow, donate, and exchange academic resources rather than purchasing every item brand new.

### Supported Resource Types
- **Academic Books & Textbooks:** Standard engineering references (e.g., Cormen's CLRS Algorithms, Morris Mano Digital Logic, Silberschatz OS, GATE solved papers).
- **Handwritten & Digital Notes:** Course-specific spiral notes, solved question banks, and mid-term study summaries.
- **Scientific Calculators:** Casio fx-991EX ClassWiz, Texas Instruments graphing calculators for semester examinations.
- **Laboratory Equipment:** Digital multimeters, oscilloscope probes, breadboards, wire bundles.
- **Project Components & IoT:** Arduino Uno kits, ESP32 boards, sensors, stepper motors for mini-projects.
- **Other College Study Gear:** Engineering drawing kits, lab coats/aprons, workshop manuals.

---

## 2. Technology Stack

- **Frontend:** React 19 + Vite 8
- **Styling:** Tailwind CSS v4 (Modern CSS theme, clean white & deep navy palette `#0f172a`, emerald accents `#10b981`)
- **Icons:** Lucide React
- **Backend & Database:** Firebase Authentication + Cloud Firestore
- **State Management & Persistence:** React Context API + LocalStorage Sandbox Fallback (Demo Mode)
- **Security:** Production-grade Cloud Firestore Security Rules (`firestore.rules`)
- **Deployment Targets:** Vercel / Firebase Hosting

---

## 3. Key Features Implemented

### A. Landing Page
- **Navigation Bar:** CampusShare branding with WCE badge, navigation links, unread notification counter bell, user avatar menu, and a **1-Click Demo User Switcher**.
- **Hero Section:** *“Share Resources. Save Money. Learn Together.”* with live search bar and dynamic statistics strip (500+ items, ₹1.8L+ saved, 6 engineering branches).
- **Category Grid:** Visual cards for Books, Notes, Calculators, Lab Equipment, Project Components, and Other with live available item counts.
- **Featured Resources:** High-demand items in active circulation with quick detail cards.
- **“How It Works” 3-Step Guide:** 
  1. *Find a Resource* (Catalog discovery & filtering)
  2. *Contact Its Owner* (Secure in-app borrow request with pickup point)
  3. *Borrow Responsibly & Return* (Peer handover & safe return)
- **CEP Impact & Sustainability Section:** Highlights affordability (saving ₹8,000–₹15,000/yr), e-waste reduction, peer collaboration, and alignment with UN Sustainable Development Goals (SDG 4 & SDG 12).
- **Footer:** College address (Vishrambag, Sangli), branch resources, and CEP project info.

### B. Browse & Search Catalog
- **Multi-Filter Bar:**
  - Real-time text search across titles, descriptions, departments, and tags.
  - Category selector (Books, Notes, Calculators, Lab Equipment, Project Components, Other).
  - Condition filter (`Like New`, `Good`, `Fair`).
  - Sharing Type filter (`Borrow & Return`, `Free to Keep (Donation)`, `Exchange`).
  - Availability status filter (`Available`, `Requested`, `Borrowed`).
  - Sorting: *Newest First*, *Oldest First*, *Title (A-Z)*, *Title (Z-A)*, *Most Viewed/Popular*.
- **Resource Cards:** Responsive grid showing condition, department, owner avatar, duration, and action buttons.
- **Friendly Empty State:** Shows dedicated search illustration with a 1-click filter reset button.

### C. Resource Details & Safe Request System
- **Comprehensive Details Modal:** High-resolution image, full course syllabus description, tags, preferred campus handover location (e.g., Central Library, CCF, Department porch).
- **Privacy Protection:** Raw personal phone numbers and private email addresses are shielded from unauthenticated scraping. Contact occurs strictly through authenticated in-app requests.
- **Borrow Request Workflow:**
  1. Requester chooses an item and opens the request modal.
  2. Selects an expected return date and proposes a campus pickup spot.
  3. Inputs a personalized note detailing their study purpose.
  4. System prevents conflicting double-requests on the same resource.
  5. The owner receives an immediate notification alert with requester's branch & year.
  6. The owner can **Accept** or **Decline** the request.
  7. Upon acceptance, the resource automatically shifts to **Borrowed** status.
  8. Either party can mark the item as **Returned**, instantly restoring it to **Available**.

### D. Authentication & Verified College Domain Restriction
- **Student Sign Up & Sign In:** Validates against the configurable institutional domain (`@walchandsangli.ac.in`).
- **Profile Fields:** Full name, college email, department, academic year (F.Y. to Final Year / M.Tech), PRN/Student ID.
- **Forgot Password Modal:** Simulated reset instructions in Demo Mode; Firebase `sendPasswordResetEmail` in production.
- **1-Click Demo Accounts:** Switch instantly between 5 test personas:
  - *Rohit Patil* (T.Y. CSE Student)
  - *Pooja Kulkarni* (Final Year Electronics Student)
  - *Aditya Deshmukh* (S.Y. IT Student)
  - *Snehal Shinde* (T.Y. Electrical Student)
  - *Dr. A. P. Joshi* (Faculty In-Charge & CEP Admin)

### E. Student Dashboard
- **Welcome Banner:** Displays verified WCE badge, department, PRN, and summary metrics.
- **Tab 1: My Listings:** Manage your listed resources, edit details, delete listings, and view availability.
- **Tab 2: My Borrow Requests:** Track requests you sent to other students (Pending, Accepted, Rejected, Returned) with option to cancel or mark returned.
- **Tab 3: Requests Received:** Incoming requests on your listed items with 1-click **Accept**, **Decline**, and **Mark Returned** buttons.
- **Tab 4: Notifications:** Real-time stream of request alerts and return reminders with "mark all as read".
- **Tab 5: Profile Settings:** Update your academic year, department, and study interests.

### F. Admin Console
- **Platform Analytics:** Total Resources, Registered Students, Active Borrows, and Pending Reports.
- **Listing Moderation:** Browse all campus resources, inspect details, and remove violating or inappropriate items.
- **Reports Resolution Queue:** Review student reports on damaged or misleading items with dismiss or delete actions.
- **Student Directory:** Audit registered students, departments, PRNs, and roles.
- **Institution Settings:** Toggle college email domain restriction enforcement.

---

## 4. Folder Structure

```
campus-share/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Badge.jsx          # Category, Condition, Status, and Sharing badges
│   │   │   ├── Footer.jsx         # Institutional WCE footer & CEP links
│   │   │   ├── Modal.jsx          # Accessible native <dialog> with light dismiss
│   │   │   └── Navbar.jsx         # Header with branding, notifications & demo switcher
│   │   ├── landing/
│   │   │   ├── CategoryGrid.jsx   # 6 Category visual cards
│   │   │   ├── FeaturedResources.jsx # Highlighted study materials
│   │   │   ├── HeroSection.jsx    # Hero banner, live search & stats
│   │   │   ├── HowItWorks.jsx     # 3-step workflow
│   │   │   └── ImpactBenefits.jsx # Affordability & sustainability benefits
│   │   ├── resources/
│   │   │   ├── AddResourceModal.jsx    # Form to list or edit a resource
│   │   │   ├── BorrowRequestModal.jsx  # Form to submit a borrow request
│   │   │   ├── ResourceCard.jsx        # Resource card component
│   │   │   ├── ResourceDetailModal.jsx # Full resource inspection modal
│   │   │   └── ResourceFilterBar.jsx   # Multi-facet search and filter bar
│   │   ├── dashboard/
│   │   │   └── StudentDashboard.jsx    # Tabs: Listings, Requests, Notifications, Profile
│   │   ├── admin/
│   │   │   └── AdminDashboard.jsx      # Moderation, Reports, Directory, Settings
│   │   └── auth/
│   │       └── AuthModal.jsx           # Sign in, Sign up, Forgot Password, Demo logins
│   ├── context/
│   │   ├── AuthContext.jsx        # User state, login/register, demo switcher
│   │   ├── ResourceContext.jsx    # Resources, requests, notifications state & CRUD
│   │   └── ToastContext.jsx       # Global toast notification provider
│   ├── services/
│   │   ├── demoData.js            # Initial realistic seed data for WCE Sangli
│   │   ├── firebase.js            # Firebase SDK initialization with fallback detector
│   │   ├── notificationService.js # Notification Firestore & LocalStorage service
│   │   ├── requestService.js      # Borrow request lifecycle service
│   │   ├── resourceService.js     # Resource catalog CRUD service
│   │   └── storageService.js      # LocalStorage sandbox persistence
│   ├── utils/
│   │   └── constants.js           # Departments, Academic Years, Categories, Pickup points
│   ├── pages/
│   │   ├── AboutPage.jsx          # CEP problem statement, outcomes, SDG alignments
│   │   ├── BrowsePage.jsx         # Filterable catalog page
│   │   └── LandingPage.jsx        # Complete homepage
│   ├── App.jsx                    # Root application component
│   ├── index.css                  # Tailwind v4 import & native dialog styling
│   └── main.jsx                   # React 19 entry point
├── .env.example                   # Environment variable template
├── firebase.json                  # Firebase hosting and firestore rules configuration
├── firestore.rules                # Production Cloud Firestore Security Rules
├── package.json
└── vite.config.js
```

---

## 5. Local Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ (tested on Node v24)
- npm or pnpm

### Quick Start (Demo Mode — Zero Configuration Needed)
1. Clone or open the repository:
   ```bash
   cd campus-share
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.
   *The application will automatically detect that no Firebase credentials are configured and will launch in **Demo Sandbox Mode** with realistic WCE student resources and 1-click test account switching.*

---

## 6. Firebase Production Setup

To connect live Firebase Authentication and Cloud Firestore:

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project (e.g. `campus-share-wce`).
2. Register a **Web App** in Project Settings.
3. Enable **Firebase Authentication** and turn on the **Email/Password** provider.
4. Enable **Cloud Firestore** in production mode.
5. Create a `.env` file in the project root based on `.env.example`:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=campus-share-wce.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=campus-share-wce
   VITE_FIREBASE_STORAGE_BUCKET=campus-share-wce.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
   VITE_COLLEGE_EMAIL_DOMAIN=walchandsangli.ac.in
   ```
6. Deploy the included Firestore Security Rules:
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase use campus-share-wce
   firebase deploy --only firestore:rules
   ```

---

## 7. Deployment Instructions

### Deploy to Vercel
1. Push this repository to GitHub.
2. Log in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your repository.
4. Set the Framework Preset to **Vite**.
5. In **Environment Variables**, add the `VITE_FIREBASE_*` variables from your `.env`.
6. Click **Deploy**. Vercel will build and serve your production distribution automatically.

### Deploy to Firebase Hosting
1. Build the production assets:
   ```bash
   npm run build
   ```
2. Deploy using Firebase CLI:
   ```bash
   firebase deploy --only hosting
   ```

---

## 8. Firestore Database Schema & Security Architecture

### Collections Structure
- **`users/{userId}`**: `uid`, `fullName`, `collegeEmail`, `department`, `academicYear`, `prn`, `role` (`student` | `admin`), `createdAt`.
- **`resources/{resourceId}`**: `resourceId`, `ownerId`, `ownerName`, `ownerEmail`, `department`, `academicYear`, `title`, `category`, `description`, `condition`, `sharingType`, `status` (`Available` | `Requested` | `Borrowed` | `Unavailable`), `imageUrl`, `duration`, `isFlagged`, `createdAt`, `updatedAt`.
- **`borrowRequests/{requestId}`**: `requestId`, `resourceId`, `ownerId`, `requesterId`, `requesterName`, `requesterEmail`, `requesterDept`, `requesterYear`, `message`, `status` (`pending` | `accepted` | `rejected` | `returned` | `cancelled`), `requestedAt`, `updatedAt`, `expectedReturnDate`.
- **`notifications/{notificationId}`**: `notificationId`, `recipientId`, `type`, `title`, `message`, `relatedResourceId`, `relatedRequestId`, `read`, `createdAt`.
- **`reports/{reportId}`**: `reportId`, `reporterId`, `resourceId`, `reason`, `status`, `createdAt`.

### Security Rules Highlights (`firestore.rules`)
- **Default Deny:** Root denial pattern `match /{document=**} { allow read, write: if false; }`.
- **RBAC & Authority Source:** `isAdmin()` verifies custom auth claims or verified administrative email; users cannot self-escalate roles.
- **Validator Function Pattern:** Rigorous field-type checking, string length bounds (prevents payload DoS), and `hasAll()`/`hasOnly()` schema protection across both `create` and `update` rules.
- **Ownership Scoping:** Users can only create or update their own listings; borrow requests are accessible only to the requester, owner, or admin; notifications are strictly recipient-readable.

---

## 9. Completed Features & Limitations

### Completed Features
- Full responsive UI/UX designed for Walchand College of Engineering, Sangli.
- Landing page with hero, search, categories, featured resources, how-it-works, impact benefits, and footer.
- Real-time search, sorting, and 5-facet filtering.
- Native `<dialog>` modal with accessibility attributes and scroll lock prevention.
- Complete borrow request workflow (Request -> Accept/Decline -> Mark Returned).
- Student Dashboard with My Listings, My Requests, Received Requests, Notifications, and Profile settings.
- Admin Panel with platform metrics, listing moderation, reports review, and student directory.
- Production-grade Cloud Firestore security rules.
- Instant 1-click Demo Account Switcher with persistent LocalStorage state.

### Limitations & Future Scope
- **Image Storage:** Currently supports direct image URLs, preset images, or local base64 images in Demo Mode. Can be connected to Firebase Cloud Storage by enabling the Storage bucket.
- **Real-Time Push Notifications:** Currently uses in-app polling/listening via Firestore. Integration with Firebase Cloud Messaging (FCM) or browser Web Push is planned for Phase 2.
- **Direct Real-Time Chat:** An in-app messaging note/handover system is implemented. A full live WebSockets chat between borrower and owner can be added as a next step.
