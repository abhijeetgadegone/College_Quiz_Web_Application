# 🎓 College Quiz Web Application

A secure and responsive web-based quiz platform built for college students and administrators. It allows students to take quizzes and view results, while admins can manage questions, quizzes, and monitor performance.

---

## 🚀 Tech Stack

### Frontend:
- Angular
- HTML, CSS, Bootstrap
- TypeScript

### Backend:
- Java (Spring Boot)
- Hibernate (JPA)
- MySQL
- JWT Authentication

---

## 📌 Features

### 👤 User (Student) Module
- 🔐 Register/Login with JWT authentication
- 🧾 View published quizzes
- 🧠 Attempt quizzes with:
  - Timer
  - Navigation between questions
  - Mark attempted/unattempted questions
- 📊 View detailed result after submission
  - Total questions, correct answers, percentage
  - Selected answers vs correct answers

### 🛠️ Admin Module
- 📥 Create/Update/Delete Questions
- 🧪 Create and manage quizzes
- ✅ Publish/Unpublish quizzes
- 📈 View test statistics:
  - Number of users who attempted
  - Performance data per test

---

## 🗃️ Database Structure

- `User` (Student/Admin with roles)
- `Quiz` (title, description, status, timer)
- `Question` (text, options, correct answer)
- `Result` (userId, quizId, score, detailed answers)
- Relationships:
  - One-to-many between Quiz and Question
  - Many-to-one between User and Result

---

## 📸 Screenshots

### 🔐 Login & Registration

**Login Page**  
<img width="500" height="400" alt="Login Page" src="https://github.com/user-attachments/assets/ff199332-91d3-4e03-a1b6-cca049a8d290" />

**User Registration**  
<img width="500" height="400" alt="User Registration" src="https://github.com/user-attachments/assets/7fde7a14-a779-4d6c-bcd0-54374d4770ae" />

---

### 🧑‍🎓 User Dashboard

<img width="500" height="400" alt="User Dashboard" src="https://github.com/user-attachments/assets/2092afdf-23f5-4085-812b-3a2464a2d7d3" />

---

### 🛠️ Admin Dashboard

<img width="500" height="400" alt="Admin Dashboard" src="https://github.com/user-attachments/assets/506a42b2-d4d8-4fd3-a42c-cae40942243d" />

---

### 🧪 Test User Interface

<img width="500" height="400" alt="Test UI" src="https://github.com/user-attachments/assets/191a99a4-a91c-4486-b244-417243edbdb8" />

---

### 📊 User Test Result

<img width="500" height="400" alt="User Result" src="https://github.com/user-attachments/assets/761a1049-49f7-4a47-8f5a-eea54f5f9afc" />

---

### 📈 Admin Test Result

<img width="500" height="400" alt="Admin Result" src="https://github.com/user-attachments/assets/7e0753d7-7dad-4461-a190-b39daf86f032" />


---
🛡️ Security
JWT-based authentication

Role-based access control (ADMIN, USER)

API access restricted via Spring Security
----
👨‍💻 Author
Abhijeet Gadegone
🔗 www.linkedin.com/in/abhijeet-gadegone-108a82214
✉️ Email: abhijeetgadegone@gmail.com
