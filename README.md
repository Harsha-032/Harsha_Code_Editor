# ⚡ Harsha's Editor — AI-Powered Code Editor

> ✨ An intelligent, modern, and beautifully designed code editor built with **Next.js** — powered by **Google Gemini AI** for smart coding assistance.

Try it live 👉 [**harsha-editor.netlify.app**](https://harsha-editor.netlify.app)

---

## 🚀 Overview

**Harsha’s Editor** is a next-generation code editor that combines a sleek UI with the power of AI.  
It allows developers to **write**, **execute**, and **get AI assistance** across multiple programming languages — all in one place.

### 🧠 Key Features

- 💬 **AI Chat Assistant** — Generate, optimize, refactor, and explain code instantly.  
- ⚙️ **Multi-Language Support** — Write and run code in various programming languages.  
- 🪄 **Code Snippets** — Quickly test logic, explore syntax, or debug solutions.  
- 🎨 **Beautiful UI/UX** — Clean and minimal interface designed with Tailwind and shadcn/ui.  
- 🔥 **Real-Time Execution** — Get instant results directly inside the editor.  
- 🧩 **Gemini AI Integration** — Uses Google’s Genkit backend for generative AI responses.

---

## 🛠️ Tech Stack

| Category | Technology |
|-----------|-------------|
| **Framework** | [Next.js (App Router)](https://nextjs.org/) |
| **Frontend** | [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| **Code Editor** | [Monaco Editor](https://microsoft.github.io/monaco-editor/) |
| **AI Backend** | [Genkit](https://firebase.google.com/docs/genkit) + Google Gemini API |

---

## 💻 Getting Started (Local Development)

Follow the steps below to set up **Harsha’s Editor** on your local machine.

### ✅ Prerequisites

Make sure you have:
- [Node.js](https://nodejs.org/en) (version **20+**)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### ⚙️ Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/harsha-editor.git
   cd harsha-editor
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a file named `.env` in the project root and add your Google Gemini API key:
   ```bash
   GEMINI_API_KEY="your_api_key_here"
   ```

---

## 🧩 Running the Application

This project runs **two processes** — one for the frontend and one for the Genkit backend.

1. **Start the Next.js Frontend**
   ```bash
   npm run dev
   ```
   The app will start on [http://localhost:9002](http://localhost:9002).

2. **Start the Genkit Backend**
   In a new terminal window:
   ```bash
   npm run genkit:dev
   ```
   This enables the AI assistant features.

---

## 🧠 AI Capabilities

The integrated AI assistant can:
- 🧑‍💻 Generate complete functions or logic blocks  
- ✨ Refactor or optimize existing code  
- 📖 Explain complex snippets in simple terms  
- ⚡ Suggest improvements or debug issues  

You can interact directly from the editor’s sidebar — making it your **AI coding partner**.

---

## 📸 Preview

![Harsha Editor Preview](https://harsha-editor.netlify.app/preview.png)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to fork the repo and submit a PR.

---

## 📬 Connect

💡 *Developed by [Harsha C](https://www.linkedin.com/in/harshac032/)*  
🔗 [**Live Demo**](https://harsha-editor.netlify.app)  
📧 Email: harshac032@gmail.com

---

### 🏁 Made with ❤️ By Harsha C
