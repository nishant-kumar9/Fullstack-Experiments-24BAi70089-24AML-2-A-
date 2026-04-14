# 🔐 Experiment 8: JWT Authentication System (Frontend + Backend)

## 👨‍💻 Student Details
**Name:** Nishant Kumar  
**UID:** 24BAI70089  
**Section:** 24AML-2(A)

---

## 📌 Overview
This project demonstrates a complete JWT-based Authentication System with a modern frontend UI and secure backend. It includes login functionality, role-based access (Admin/User), protected routes, and token-based authentication.

---

## 🚀 Live Demo
Frontend (Vercel):  
https://fullstack-experiments-24-b-ai70089-eta.vercel.app/

Backend (Render):  
https://fullstack-experiments-24bai70089-24aml-2-elna.onrender.com

---

## ⚙️ Features
- 🔐 JWT Authentication (Login system)
- 👤 Role-based access (Admin / User)
- 🛡️ Protected routes using middleware
- 💾 Token stored in localStorage
- 🎨 Modern Dark UI (customized)
- ⚡ Fast frontend using Vite + React
- 🔄 API integration between frontend & backend

---

## 🛠️ Tech Stack

### 🔹 Frontend
- React.js (Vite)
- Axios
- React Router DOM

### 🔹 Backend
- Node.js
- Express.js
- JSON Web Token (JWT)

---

## 🔑 Login Credentials

### 👑 Admin
Username: admin  
Password: 123  

### 👤 User
Username: user  
Password: 123  

---

## 📌 API Endpoint

### 🔹 Login API
POST:  
https://fullstack-experiments-24bai70089-24aml-2-elna.onrender.com/api/login

Body:
{
  "username": "admin",
  "password": "123"
}

---

## 🔐 How Authentication Works
1. User enters username & password  
2. Backend verifies credentials  
3. JWT token is generated  
4. Token is stored in browser (localStorage)  
5. Token is used to access protected routes  

---

## 🧪 How to Run Locally

### 🔹 Backend
cd backend  
npm install  
node server.js  

### 🔹 Frontend
cd frontend  
npm install  
npm run dev  

---

## 🧠 Project Structure
Experiment8/
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── middleware/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/

---

## 🔐 Security Features
- JWT Token-based authentication  
- Middleware protection for routes  
- Role-based authorization (Admin/User)  
- Secure API communication  

---

## ⚠️ Notes
- Render backend may take 20–30 seconds to wake up (free tier)  
- Ensure backend URL is correctly set in frontend  
- Login credentials are predefined in backend  

---

## 🎯 Conclusion
This project demonstrates a secure full-stack authentication system using JWT with a clean UI and protected backend routes.

---

## 👨‍💻 Author
Nishant Kumar
