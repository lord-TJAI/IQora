# IQora — Subject-Specific Learning Engine

> **Learn. Practice. Master. Next.**  
> A curriculum-driven, gamified learning platform for CBSE Class XII students — built as a front-end demo with React, TypeScript, and Tailwind CSS.

---

## Overview

IQora is a fully interactive student learning platform that connects students, teachers, and administrators through a unified, premium-quality web application. It features subject-specific learning paths, adaptive practice, AI mentoring, assignment management, and a real-time gamified progression system — all rendered entirely in the browser with no backend required.

---

## ✨ Features

### 🎓 Student Portal
| Area | What it does |
|------|-------------|
| **Home** | Hero dashboard with live mastery %, streak tracker, AI tutor, work-due sidebar |
| **Learn** | Subject-specific curriculum browser (Math, Physics, Chemistry, English) |
| **Chapter & Lessons** | Unit → Chapter → Concept hierarchy with mastery bars |
| **Practice** | Four modes: Adaptive, Weak-area drill, Mixed drill, AI-generated |
| **Work** | Assignment list + rich submission page (file upload, text, comments) |
| **AI Tutor** | Context-aware AI chat with Explain / Solve / Quiz / Summarize modes |
| **Profile** | XP, streak, mastery heatmap, leaderboard rank, achievement badges |
| **Leaderboard** | Weekly/monthly ranking with position tracking |
| **Notifications** | In-app alerts for assignments, marks, and teacher messages |
| **Ask Teacher** | Raise doubts directly to assigned teachers from any page |

### 👩‍🏫 Teacher Portal
| Area | What it does |
|------|-------------|
| **Dashboard** | Pending evaluations, active classes, quick-action cards |
| **Classes** | Class roster, student mastery overview, attendance tracking |
| **Assignments** | Create, assign, track, and evaluate homework & tests |
| **Student Profiles** | Per-student mastery drill-down with topic-level insights |
| **Work Hub** | Central queue for all pending evaluations |
| **Materials** | Upload and manage study resources per class |

### 🛠️ Admin Portal
| Area | What it does |
|------|-------------|
| **Dashboard** | School-wide metrics, enrollment, attendance overview |
| **Students / Teachers** | Directory management with avatar-based identity system |
| **Classes & Subjects** | Manage class-subject assignments |
| **Academic Year** | Configure year cycles and term structures |
| **Reports** | Aggregated school performance reports |

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 18 + TypeScript |
| **Build** | Vite 6 |
| **Styling** | Tailwind CSS 3 |
| **Routing** | React Router DOM 6 |
| **State** | Zustand |
| **Forms** | React Hook Form + Zod |
| **Data Fetching** | TanStack Query |
| **Animation** | Framer Motion |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Utilities** | clsx, tailwind-merge, date-fns, canvas-confetti |

---

## 📁 Project Structure

```
IQora/
├── public/
│   ├── hero_character.png   # Hero banner anime student illustration
│   ├── ai_robot.png         # AI Tutor 3D robot illustration
│   └── logo.svg
├── src/
│   ├── features/
│   │   ├── auth/            # Login, Register
│   │   ├── student/         # 22 student screens
│   │   ├── teacher/         # 20 teacher screens
│   │   └── admin/           # 8 admin screens
│   ├── layouts/
│   │   ├── StudentLayout.tsx
│   │   ├── TeacherLayout.tsx
│   │   ├── AdminLayout.tsx
│   │   ├── AuthLayout.tsx
│   │   └── ProtectedRoute.tsx
│   ├── components/
│   │   ├── ui/              # Avatar, Toast, shared primitives
│   │   ├── learning/        # MasteryBar, AchievementCard
│   │   ├── curriculum/      # Subject-specific UI components
│   │   ├── query/           # AskTeacherModal
│   │   └── teacher/         # Teacher-specific components
│   ├── data/
│   │   └── curriculum/      # CBSE curriculum data (Math, Physics, Chemistry, English)
│   ├── demo/                # Pre-populated demo data for all roles
│   ├── stores/              # Zustand auth & UI stores
│   ├── types/               # Shared TypeScript interfaces
│   ├── routes/              # Application route definitions
│   ├── services/            # Service layer (teacher, student)
│   └── utils/               # cn(), shared helpers
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Node.js 20+
- `pnpm` (recommended) — or `npm` / `yarn`

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/IQora.git
cd IQora

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

App will be available at `http://localhost:5173`.

### Build for Production

```bash
pnpm build
pnpm preview     # Preview the production build locally
```

---

## 🔑 Demo Login

This is a **fully front-end demo** — no backend or real credentials required. Use the role selector on the login screen:

| Role | Email | Password |
|------|-------|----------|
| **Student** | `student@iqora.demo` | `demo1234` |
| **Teacher** | `teacher@iqora.demo` | `demo1234` |
| **Admin** | `admin@iqora.demo` | `demo1234` |

---

## 📐 Curriculum Data

IQora ships with a complete **CBSE Class XII 2026–27** curriculum dataset across 4 subjects:

| Subject | Units | Chapters | Key Topics |
|---------|-------|----------|------------|
| **Mathematics** | 6 | 20+ | Calculus, Algebra, Vectors, Probability |
| **Physics** | 7 | 16+ | Electrostatics, Optics, Modern Physics |
| **Chemistry** | 5 | 16+ | Organic, Electrochemistry, Coordination |
| **English** | 4 | 12+ | Prose, Poetry, Grammar, Writing Skills |

Mastery percentages are tracked at the concept level and flow up through chapters → units → subjects.

---

## 🎮 Gamification System

The student progression loop maps directly to in-app actions:

```
Learn → Practice → Complete Work → Improve Mastery
     → Earn XP → Maintain Streak → Unlock Achievements
     → Rise on Leaderboard → Return & Continue
```

| Element | Details |
|---------|---------|
| **XP** | Earned on lesson completion, practice sessions, and assignment submission |
| **Streak** | Daily learning streak with Mon–Sun visual tracker |
| **Achievements** | Hexagonal badge system (First Steps, 7 Day Streak, Math Starter, etc.) |
| **Leaderboard** | Weekly / Monthly rank with XP comparison |

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| **Primary Accent** | `#FFC800` (IQora Yellow) |
| **Text Dark** | `#172033` |
| **Text Muted** | `#667085` |
| **Math** | `#4F7CFF` (Blue) |
| **Physics** | `#7C4DFF` (Purple) |
| **Chemistry** | `#20C997` (Teal) |
| **English** | `#FF8A3D` (Orange) |
| **Border** | `#E6EAF0` |
| **Background** | `#F7F9FC` |

Typography is set in the system sans-serif stack with heavy `font-black` (900) headings throughout for a bold, premium feel.

Avatars are generated deterministically via a custom [`Avatar`](src/components/ui/Avatar.tsx) component — zero external image dependencies.

---

## 🧪 Type Checking

```bash
pnpm exec tsc --noEmit   # 0 errors expected
```

---

## 📸 Screenshots

| Home | Learn | Practice |
|------|-------|----------|
| Hero banner with student character, subject cards, streak & AI tutor | CBSE curriculum browser with mastery progress | Adaptive / weak-area / mixed / AI-generated practice modes |

---

## 🗺️ Roadmap

- [ ] Real backend integration (Supabase / Firebase)
- [ ] Teacher live feedback & annotation on submissions
- [ ] AI-generated adaptive question bank via Gemini API
- [ ] Push notifications for due work
- [ ] Parent portal view
- [ ] Offline PWA support

---

## 🤝 Contributing

This is a demo build. For feature proposals or bug reports, open an issue or submit a PR against the `main` branch.

---

## 📄 License

MIT © 2026 IQora. Built for educational demonstration purposes.
