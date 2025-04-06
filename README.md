# 🎨 SketchTrack – SVG Design Version Control Tool

SketchTrack is a full-stack collaborative version control system for SVG designs. It enables designers and developers to track, manage, and revert design versions with ease. Built with React, Node.js, Express, and Supabase, SketchTrack brings Git-like functionality to visual design projects.

---

## 📚 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Backend API Routes](#backend-api-routes)
- [Frontend Overview](#frontend-overview)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [License](#license)

---

## ✨ Features

- 🔐 Custom user authentication (Login/Register)
- 📁 Create, view, and manage repositories (design projects)
- 🖼️ Upload SVG files to projects
- 📜 Auto-detect changes and version control
- 🧩 Rollback to previous design versions
- 👥 Add collaborators with access levels (read/write/admin)
- 🌐 Public URLs for SVG files via Supabase storage
- 💬 Commit messages for each upload
- 📊 Organized version history per project

---

## 🛠 Tech Stack

### Frontend
- React
- TailwindCSS
- Axios
- React Router

### Backend
- Node.js
- Express
- Supabase (Auth, DB, Storage)

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- Supabase project with:
  - Auth enabled
  - Storage bucket created
  - Tables: `projects`, `file_versions`, `collaborators`

### Clone the repo

```bash
git clone https://github.com/your-username/sketchtrack.git
cd sketchtrack
npm install          # For backend
cd client && npm install   # For frontend
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-service-role-key
SUPABASE_BUCKET=your-bucket-name
# Backend
npm start

# Frontend (in /client)
npm start
