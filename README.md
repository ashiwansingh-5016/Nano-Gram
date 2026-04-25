# 📸 Nano-GRam

Nano-GRam is a high-fidelity, responsive Instagram-inspired social media web application. Built with **React 19** and **Vite**, it offers a seamless, interactive user experience with local persistence, dynamic content generation, and a premium design aesthetic.

---

## ✨ Key Features

### 🔐 User Authentication
- **Simulated Login**: A beautiful login interface that allows users to enter a username and start their journey.
- **Persistence**: Authentication state is stored in `localStorage`, ensuring users stay logged in even after refreshing the page.
- **Dynamic Session**: Users can log out at any time, which clears the session and redirects them back to the login screen.

### 🏠 Interactive Feed
- **Dynamic Posts**: A main feed that displays posts from various users, including captions and timestamps.
- **Liking System**: Users can double-tap or click the heart icon to like/unlike posts. The like state is unique to each user and persisted.
- **Infinite Loading**: Experience a smooth "Load More" functionality that fetches new mock posts dynamically using the Picsum API.

### 🔍 Explore Page
- **Grid Layout**: A dedicated explore section featuring a modern grid of high-quality images, perfect for discovering new content.

### 👤 User Profiles
- **Personalized Space**: Each user has a dedicated profile page showing their stats (posts, followers, following) and a grid of their uploaded content.
- **Randomized Bios**: To enhance realism, profiles feature dynamically generated names and bios.

### ➕ Post Creation
- **Instant Sharing**: A streamlined modal interface for creating new posts. Users can provide an image URL and a caption, and the post is instantly added to the feed and profile.
- **Local Persistence**: All created posts are stored locally, so your content remains available across sessions.

### 🧭 Premium Sidebar Navigation
- **Responsive Design**: A sleek, fixed sidebar for desktop users that provides quick access to Home, Explore, Messages, Create, and Profile.
- **Active States**: Visual indicators for the currently active route.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **State Management**: [Context API](https://react.dev/learn/passing-data-deeply-with-context)
- **Styling**: Vanilla CSS (Modern CSS variables, Flexbox, Grid)
- **Persistence**: Browser `localStorage` API

---

## 🏗️ Project Architecture

### 🧠 State Management (AppContext)
The application uses a centralized context provider (`AppContext.jsx`) to manage:
- **`posts`**: An array of post objects (loaded from storage or mock data).
- **`currentUser`**: The currently authenticated user object.
- **`toggleLike`**: Global logic for handling post interactions.
- **`addPost`**: Logic for prepending new user-created posts to the state.

### 📁 Folder Structure
```text
src/
├── Component/
│   ├── CreatePost/    # Modal for adding new content
│   ├── Explore/       # Grid view of diverse posts
│   ├── Feed/          # Main scrollable post stream
│   ├── Login/         # Auth interface and logic
│   ├── Post/          # Reusable post card component
│   ├── Profile/       # User statistics and personal gallery
│   └── Sidebar/       # Main navigation hub
├── context/
│   └── AppContext.jsx # Global state provider
├── App.jsx            # Main routing and layout wrapper
├── index.css          # Global styles and design tokens
└── main.jsx           # Application entry point
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Nano-GRam.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Nano-Gram
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

---

## 🎨 Design Philosophy
Nano-GRam focuses on **Visual Excellence**:
- **Typography**: Uses clean, modern font stacks for readability.
- **Micro-animations**: Subtle transitions on hover and interaction (e.g., heart pulse, sidebar highlights).
- **Glassmorphism**: Modern UI elements with subtle borders and shadows to create depth.
- **Responsiveness**: Tailored layouts that adapt gracefully to different screen sizes.

---

## 📄 License
This project is for educational purposes as part of a collage portfolio.

---
*Created with ❤️ by Ashiwan Singh*
