<a href="https://archivio-ten.vercel.app" target="_blank">
  <picture>
    <img src="https://raw.githubusercontent.com/alessandro-arg/assets/refs/heads/main/archivio.svg" width="200" alt="Archivio logo" />
  </picture>
</a>

<h1>
Minimal Secure File Storage
</h1>

![Repo Size](https://img.shields.io/github/repo-size/alessandro-arg/archivio?color=%234F63D9&style=for-the-badge)
![Last Commit](https://img.shields.io/github/last-commit/alessandro-arg/archivio?color=%237288FA&style=for-the-badge)
![Issues](https://img.shields.io/github/issues/alessandro-arg/archivio?color=%238FA1FF&style=for-the-badge)

Archivio is a **minimal, secure personal file storage web app** allowing users to instantly upload, organize, and access files from anywhere using **one-time password (OTP)-based authentication** and a fast, responsive UI.

> A lightweight, privacy-focused place to store and retrieve files, with focus on secure access and simplicity.

### 🌍 Live Demo 
🖥  <a href="https://archivio-ten.vercel.app" target="_blank">
**https://archivio.alessandro-argenziano.com/**
</a>

##

### ✨ Key Features

| Feature                         | Description                                                     |
| ------------------------------- | --------------------------------------------------------------- |
| **🔑 OTP-Based Login**          | Secure access with one-time passwords, no traditional login.   |
| **📁 File Upload & Download**   | Upload, organize and download files easily.                     |
| **🗂 File Organization**        | Group and categorize uploaded files however you like.          |
| **🌐 Fast & Responsive UI**     | Designed for desktop and mobile devices alike.                  |
| **🔒 Simple Security**          | Minimal access surface, keeping auth simple and secure.         |
| **📦 Deploy-Ready**             | Easily deployable on Vercel or other serverless hosts.          |

##

### 🛠 Tech Stack

#### Frontend

- **Next.js** (React framework)
- **React + TypeScript**
- **Tailwind CSS** (utility-first styling)
- **shadcn/ui** (UI component system)
- **OTP auth flow**

#### Backend / API

- **Edge / Serverless functions** (via Next.js API)
- **Appwrite (Databases & auth)**
- **Lightweight auth handling (OTP)**

##

### 🚀 Installation

```bash
git clone https://github.com/alessandro-arg/archivio.git
cd archivio
npm install
npm run dev
```

Then open:

```
http://localhost:3000
```

### ⚙️ Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_APP_URL=http://localhost:3000
STORAGE_BACKEND_ENDPOINT=
OTP_SECRET_KEY=
```

Adjust according to the storage API / backend you choose.

##

### 📂 Project Structure

```
/
├─ app/                      # Next.js App Router (routes, layouts, API routes)
│  ├─ api/                   # Route handlers (if present)
│  ├─ page.tsx               # Home route (if present)
│  └─ globals.css            # Global styles (commonly here in App Router)
├─ components/               # Shared UI components (root-level)
├─ constants/                # App constants (strings, config, enums, etc.)
├─ lib/                      # Helpers/utilities (e.g., auth/storage/etc.)
├─ public/                   # Static assets
├─ types/                    # Shared TS types
├─ components.json           # shadcn/ui config
├─ eslint.config.mjs
├─ next.config.ts
├─ postcss.config.mjs
├─ tsconfig.json
├─ package.json
├─ package-lock.json
├─ .gitignore
└─ README.md
```

##

### 📜 Scripts

| Command         | Action                   |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build production version |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

### 🚀 Deployment

#### **Deploy to Vercel (Recommended)**

```bash
npm install -g vercel
vercel
```

Ensure environment variables are set in the Vercel dashboard.

##

### 🤝 Contributing

```bash
git checkout -b feature/YourFeature
git commit -m "feat: add YourFeature"
git push origin feature/YourFeature
```

Open a Pull Request once done.

##

Made with ❤️ by **Alessandro**
