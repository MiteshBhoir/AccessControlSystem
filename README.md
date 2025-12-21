# Secure User Profile & Access Control System (Assignment 1)

## 📌 Project Overview

This project is developed as part of **Assignment 1: Secure User Profile & Access Control System** for GET 2026.

The goal of this application is to build a **secure identity management system** that allows users to **register, login, and view their profile**, while ensuring sensitive information (Aadhaar number) is **securely encrypted at rest** and **decrypted only when required**.

The system follows a **full-stack architecture** using **React (Vite)** on the frontend and **Node.js + Express + MongoDB** on the backend with **JWT-based authentication**.

---

## 🧱 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios
* React Router
* Context API

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT (JSON Web Tokens)
* bcryptjs
* AES encryption (crypto module)

---

## 🔐 Key Features

* User Registration & Login
* JWT-based Authentication
* Encrypted Aadhaar storage (AES)
* Secure Profile Fetch API
* Role-independent Access Control
* Client-side & Server-side Error Handling

---

## 📂 Project Structure

```
ACS/
│
├── client/
│   ├── src/
│   │   ├── api/axios.js
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   └── Navbar.jsx
│   │   ├── context/AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── Profile.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── configs/db.js
│   ├── controllers/userController.js
│   ├── middleware/auth.js
│   ├── models/userModel.js
│   ├── routes/userRoutes.js
│   ├── utils/encryption.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Setup & Run Instructions

### 1️⃣ Clone the Repository

```bash
git clone <your-github-repo-url>
cd ACS-COPY
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ENCRYPTION_KEY=your_32_byte_secret_key
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## 🔗 API Documentation

### 🔹 Register User

**POST** `/api/register`

```json
{
  "name": "Mitesh",
  "email": "test@mail.com",
  "password": "password123",
  "aadhar": "123456789012"
}
```

---

### 🔹 Login User

**POST** `/api/login`

```json
{
  "email": "test@mail.com",
  "password": "password123"
}
```

Response:

```json
{
  "token": "jwt_token_here"
}
```

---

### 🔹 Get User Profile (Protected)

**GET** `/api/data`

Headers:

```
Authorization: Bearer <token>
```

Returns decrypted Aadhaar number.

---

## 🗄️ Database Schema

### User Model

```js
{
  name: String,
  email: String,
  password: String (hashed),
  aadhar: String (encrypted),
  iv: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🤖 AI Tool Usage Log (MANDATORY)

### AI Tools Used

* **ChatGPT** (Primary)
* **Google Gemini** (Secondary – limited effectiveness)

---

### AI-Assisted Tasks (Detailed)

The following table lists **concrete, job-relevant tasks** where AI tools were used strategically to improve productivity, correctness, and code quality.

| Category                  | AI-Assisted Task                                                                                      | Impact / Outcome                                                  | Tool Used |
| ------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | --------- |
| Backend Architecture      | Designed secure JWT-based authentication flow (login, register, token verification)                   | Reduced auth design time and avoided common security pitfalls     | ChatGPT   |
| Security Engineering      | Generated AES-256 encryption & decryption utility for Aadhaar data at rest                            | Ensured sensitive data protection aligned with industry standards | ChatGPT   |
| Debugging & Reliability   | Diagnosed and fixed bcrypt, JWT, and MongoDB index issues (select:false, duplicate index, token flow) | Improved system stability and prevented runtime crashes           | ChatGPT   |
| API Design                | Refactored REST APIs with proper status codes and centralized error handling                          | Cleaner, production-ready API behavior                            | ChatGPT   |
| Database Design           | Helped analyze schema design, unique index issues, and migration strategy                             | Prevented data integrity issues in MongoDB                        | ChatGPT   |
| Frontend State Management | Improved React Context-based authentication & modal visibility handling                               | Reliable login/logout UX and predictable state flow               | ChatGPT   |
| Code Quality              | Suggested modular folder structure and separation of concerns (controllers, routes, utils)            | More maintainable and scalable codebase                           | ChatGPT   |
| Documentation             | Generated and refined README.md to match evaluation rubric and hiring expectations                    | Clear technical communication and compliance                      | ChatGPT   |
| AI Tool Comparison        | Experimented with Google Gemini for backend suggestions and compared outputs                          | Identified limitations; chose better-suited tool                  | Gemini    |

---

------|------------------------------|-----------|
| Backend Auth | Designed JWT-based login & registration flow | ChatGPT |
| Encryption | Generated AES-256 encryption & decryption utility for Aadhaar | ChatGPT |
| Debugging | Resolved bcrypt, JWT, MongoDB index & auth-context bugs | ChatGPT |
| API Design | Helped structure RESTful APIs with proper error handling | ChatGPT |
| Frontend State | Improved AuthContext & login modal state handling | ChatGPT |
| Documentation | Generated and structured README.md as per evaluation rubric | ChatGPT |
| Alternate AI Trial | Tested Google Gemini for backend logic suggestions | Gemini |

---

### Effectiveness Score

**Overall Score: 4 / 5**

**Justification:**
ChatGPT significantly improved productivity by accelerating backend logic, encryption workflows, debugging complex authentication issues. Google Gemini was explored briefly but provided less precise and less actionable solutions for this project, so it was not used extensively. The AI tools saved several hours of development time, though some AI-generated suggestions required manual validation and refinement.AI is useful only when i have the knowledge of technology and understand the code written by AI.

---


## ✅ Assignment Compliance Checklist

* ✔ Secure JWT Authentication
* ✔ Encrypted Aadhaar Storage
* ✔ Decryption on Authorized Fetch
* ✔ Full-stack Implementation
* ✔ AI Usage Documented
* ✔ Clean Project Structure

---

## 👨‍💻 Author

**Mitesh Bhoir**

Computer Engineering Student | MERN Stack Developer | AI & ML Enthusiast

---

## 📎 Notes

This project fulfills **Assignment 1** requirements as specified in the GET 2026 Full Stack Assignment guidelines.

