<p align="center">
  <img src="./src/assets/logo-bg-remove.png" alt="MediConnect Logo" width="160"/>
</p>

<h1 align="center">MediConnect – Patient Healthcare App</h1>

<p align="center">
  <strong>A modern, scalable healthcare application for patients built with React Native (Expo)</strong>
</p>

<p align="center">
  Book appointments • View prescriptions • Manage medical data — all in one place
</p>

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Authentication Flow](#authentication-flow)

---

## Features

- **Secure Authentication:** OTP-based login with JWT tokens and Google OAuth support.
- **Doctor Search:** Find healthcare providers by specialty, location, and availability.
- **Appointment Booking:** Schedule and manage appointments with ease.
- **Prescription Management:** View and track your prescriptions digitally.
- **Medical Records:** Access your complete medical history and information.
- **Profile Management:** Update personal information and app preferences.
- **Dashboard:** Clean, intuitive home screen with quick access to key features.
- **Responsive Design:** Optimized for mobile with component-based architecture.

---

## Tech Stack

### Frontend
- **React Native (Expo)** - Cross-platform mobile development
- **NativeWind** - Tailwind CSS for React Native styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **PostgreSQL** - Database

### Authentication & Security
- **JWT** - JSON Web Tokens for secure authentication
- **Google OAuth** - Social login integration
- **OTP Email** - One-time password verification

---

## Project Structure

```text
MediConnect/
├── App.jsx                      # Main application entry point
├── src/                         # Source code
│   ├── components/              # Reusable UI components
│   ├── screens/                 # Application screens
│   ├── constants/               # Colors, themes, and constants
│   ├── navigation/              # Tab & Stack navigation setup
│   └── context/                 # React Context providers
└── ...
```

---

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npx expo start
   ```

---

## Authentication Flow

1. User enters email
2. System sends OTP via email
3. User enters OTP code
4. If valid, generate JWT Token and initialize user session
5. Redirect to dashboard
