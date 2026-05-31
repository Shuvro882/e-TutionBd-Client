📘 eTuitionBd – Tuition Management System
 Project Overview

eTuitionBd is a full-stack Tuition Management Platform where students can post tuition requirements, tutors can apply, and admins can manage the entire system including users, tuitions, and payments.

The system automates the process of finding qualified tutors and ensures secure communication, transparent payments, and proper verification.

🎯 Purpose of the Project
Solve real-life tutor–student matching problems
Reduce manual communication gaps
Provide structured tuition workflow
Enable secure online payments (Stripe)
Give admin full control over platform activities
🚀 Live Links
🌐 Live Site: your-live-link-here
🖥️ Client Repo: your-client-repo
🧑‍💻 Server Repo: your-server-repo
🧰 Tech Stack
Frontend:
React.js
Tailwind CSS / DaisyUI
React Router
Axios
Framer Motion
TanStack Query
Backend:
Node.js
Express.js
MongoDB
JWT Authentication
Stripe Payment Gateway
Authentication:
Firebase Authentication (Email + Google Login)
🔥 Key Features
👨‍🎓 Student Features
Post tuition requirements
Edit / Delete tuition posts
View tutor applications
Approve tutors with payment
View payment history
Profile management
👨‍🏫 Tutor Features
Browse tuition posts
Apply with qualifications & experience
Track application status
View approved tuitions
Revenue history
🛡️ Admin Features
Manage users (CRUD + role update)
Approve / reject tuition posts
Monitor platform activity
View analytics & reports
🔐 Authentication System
Firebase Authentication (Email + Google Login)
JWT-based authorization
Role-based routing:
Student Dashboard
Tutor Dashboard
Admin Dashboard
Secure private routes
💳 Payment System
Stripe integration
Tutor approval only after successful payment
Transaction stored in database
📊 Dashboard System
Separate dashboards for Student / Tutor / Admin
Admin analytics with charts
Responsive sidebar layout
🗂️ Main Pages
Home
Tuitions
Tutors
About
Contact
Login / Register
Dashboard (Role-based)
Payment History
Profile Settings
Error Page (404)
🛠️ Packages Used
Client:
axios
react-router-dom
@tanstack/react-query
firebase
framer-motion
daisyui / tailwindcss
Server:
express
cors
mongodb
dotenv
jsonwebtoken
stripe
🔒 Environment Variables
Client (.env)
VITE_API_KEY=
VITE_AUTH_DOMAIN=
VITE_PROJECT_ID=
Server (.env)
PORT=5000
MONGO_URI=
JWT_SECRET=
STRIPE_SECRET_KEY=
FIREBASE_ADMIN_KEY=
📈 Challenges Implemented
Search & Filter system
Pagination (tuition list)
JWT token verification with role
Sorting by budget/date
⚠️ Important Notes
Firebase keys secured in environment variables
MongoDB credentials protected with .env
Fully responsive UI (mobile + desktop)
No CORS / 404 issues in production
Protected routes implemented
👨‍💻 Author
Name: Shuvro Saha
Role: Full Stack Developer
📌 Future Improvements
Real-time messaging system
Notification system
Tutor rating system
Advanced analytics dashboard
🏁 Conclusion

This project demonstrates a full-scale MERN application with authentication, role-based dashboards, payment integration, and real-world workflow management.

Live link:https://e-tuitionbd-client.netlify.app/