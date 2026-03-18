# 💳 JWT Authentication Banking API

## 👨‍💻 Student Details

**Name:** Nishant Kumar
**UID:** 24BAI70089
**Section:** 24AML-2(A)

---

## 📌 Overview

This project implements a secure Banking API using JWT (JSON Web Token) authentication. It includes user registration, login, protected routes, and token-based security.

---

## 🚀 Live Demo

Base URL:
https://two4bai70089-exp222.onrender.com

---

## ⚙️ Features

* User Registration & Login
* Password hashing using bcrypt
* JWT Token generation & verification
* Protected routes (Authorization required)
* Token expiration & refresh
* Secure user data handling

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* jsonwebtoken (JWT)
* bcrypt

---

## 📌 API Endpoints (Direct Links)

### 🔹 1. Register User

POST
https://two4bai70089-exp222.onrender.com/api/auth/register

**Body:**

```json
{
  "name": "Nishant",
  "email": "test@mail.com",
  "password": "123456"
}
```

---

### 🔹 2. Login User

POST
https://two4bai70089-exp222.onrender.com/api/auth/login

**Body:**

```json
{
  "email": "test@mail.com",
  "password": "123456"
}
```

👉 Copy the JWT token from response

---

### 🔹 3. Protected Route

GET
https://two4bai70089-exp222.onrender.com/api/protected

**Header:**

```
Authorization: Bearer YOUR_TOKEN
```

---

### 🔹 4. Refresh Token

POST
https://two4bai70089-exp222.onrender.com/api/auth/refresh

**Body:**

```json
{
  "token": "OLD_TOKEN"
}
```

---

## 🧪 How to Test (Step-by-Step)

1. Register a user using the register API
2. Login using the login API
3. Copy the JWT token
4. Access the protected route using the token in headers

---

## 🔐 Security Features

* Password hashing using bcrypt
* JWT-based authentication
* Token expiration (15 minutes)
* Protected API routes
* Environment variables for secrets

---

## ⚠️ Notes

* First request may be slow (Render free tier sleep)
* Token must be sent as: `Bearer <token>`

---

## 🎯 Conclusion

This project demonstrates secure authentication using JWT in a banking API, ensuring only authorized users can access protected resources.

---

## 👨‍💻 Author

Nishant Kumar
