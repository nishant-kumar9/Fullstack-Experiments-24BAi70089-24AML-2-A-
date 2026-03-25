# 💸 Transaction Rollback Banking System

## 👨‍💻 Student Details

Name: Nishant Kumar  
UID: 24BAI70089  
Section: 24AML-2(A)

---

## 📌 Overview

This project demonstrates a full-stack banking system that implements transaction management with rollback support. It ensures data consistency by applying the Atomicity property of ACID, where a transaction either completes fully or is completely reversed in case of failure.

---

## 🚀 Project Description

The system allows:
- Creating user accounts  
- Viewing account details  
- Transferring money between accounts  
- Automatically rolling back transactions if an error occurs (e.g., insufficient balance)

---

## ⚙️ Features

- Account creation with initial balance  
- View all accounts  
- Secure money transfer between accounts  
- Transaction rollback on failure  
- Backend-controlled atomic operations  
- Error handling for invalid transactions  

---

## 🛠️ Tech Stack

- Node.js  
- Express.js  
- MongoDB  
- Mongoose (Transactions & Sessions)  

---

## 🌐 Base URL

http://localhost:3000

---

## 📌 API Endpoints

### 1. Create Account

POST  
http://localhost:3000/accounts  

Body:
{
  "name": "Nishant",
  "balance": 5000
}

---

### 2. Get All Accounts

GET  
http://localhost:3000/accounts  

---

### 3. Transfer Money (Success Case)

POST  
http://localhost:3000/transfer  

Body:
{
  "fromId": "ACCOUNT_ID_1",
  "toId": "ACCOUNT_ID_2",
  "amount": 1000
}

---

### 4. Transfer Failure (Rollback Case)

POST  
http://localhost:3000/transfer  

Body:
{
  "fromId": "ACCOUNT_ID_1",
  "toId": "ACCOUNT_ID_2",
  "amount": 999999
}

---

## 🧪 How to Test

1. Create accounts using POST /accounts  
2. Fetch accounts using GET /accounts  
3. Perform valid transfer → balances update (COMMIT)  
4. Perform invalid transfer → balances unchanged (ROLLBACK)  

---

## 🔄 Transaction Logic

- Start transaction  
- Deduct amount from sender  
- Add amount to receiver  
- If success → COMMIT  
- If error → ROLLBACK  

---

## 🔐 Key Concepts

- Atomicity  
- Database transactions  
- Error handling  
- Data consistency  

---

## ⚠️ Notes

- Ensure MongoDB is running  
- Use Thunder Client or Postman for testing  
- Verify database before and after transactions  

---

## 🎯 Conclusion

This project demonstrates how transaction rollback ensures data consistency and reliability in a banking system by preventing partial updates.

---

## 👨‍💻 Author

Nishant Kumar