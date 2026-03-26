#  TalkSphere – Real-Time Chat Application

**A full-stack, production-grade real-time chat platform with messaging, groups, media sharing, and friend request system — built for speed, scalability, and real-world performance.**

   Live: https://chat-app-client-orpin-delta.vercel.app

---

##  Overview

TalkSphere is a **real-time communication platform** that enables:

*  One-to-one messaging
*  Group chats with admin controls
*  Media sharing (images, videos, docs)
*  Friend request system

Built using **WebSockets (Socket.io)**, the application ensures **instant, bidirectional communication** with minimal latency.

---

##  Why This Project?

This project was built to master:

* Real-time system design
* WebSocket communication
* Event-driven architecture
* Scalable backend design

It simulates how modern apps like **WhatsApp / Discord** handle messaging and synchronization.

---

##  Core Features

###  Messaging System

* Real-time messaging using **Socket.io**
* Instant message delivery (no refresh)
* Typing & online status (if implemented)

---

###  Group Chat System

* Create, update, and delete groups
* Add/remove members dynamically
*  Admin role for group control
* Admin can remove members or delete group

---

###  Friend Request System

* Send friend requests
* Accept / reject requests
* Manage friend connections

---

###  Media Sharing

* Send images, videos, documents, and audio
* Cloud storage using **Cloudinary**
* Optimized file upload using **Multer**

---

###  Admin Dashboard

* View platform statistics
* Charts & analytics using **Chart.js**
* Monitor users and activity

---

##  Authentication & Security

*  JWT-based authentication
* Access Token + Refresh Token mechanism
* Secure session handling
* Protected routes & APIs
* Role-based access (User / Group Admin)

---

##  System Architecture

###  Workflow

1. User logs in (JWT authentication)
2. Client establishes **WebSocket connection (Socket.io)**
3. User sends message → emitted via socket event
4. Server processes & broadcasts message instantly
5. Database updated (MongoDB via Prisma)
6. All connected clients receive message in real-time

---

##  Key Functional Modules

*  **Real-Time Engine**

  * Powered by WebSockets (Socket.io)
  * Bi-directional communication

*  **Event-Driven Architecture**

  * Message events
  * Friend request events
  * Group updates

*  **State Management**

  * Redux Toolkit + RTK Query
  * Efficient caching & API handling

*  **Media Handling**

  * Cloudinary for storage
  * Multer for uploads

---

##  Tech Stack

### 🔹 Frontend

* React.js
* Redux Toolkit
* RTK Query
* Tailwind CSS
* ShadCN UI

### 🔹 Backend

* Node.js
* Express.js
* Socket.io
* Multer

### 🔹 Database

* MongoDB
* Prisma ORM

###  Tools & Services

* Cloudinary (Media Storage)
* Docker
* Postman
* Git & GitHub

###  Deployment

* Vercel (Frontend)
* Render (Backend)

---

##  Deployment

| Component | Platform   |
| --------- | ---------- |
| Frontend  | Vercel     |
| Backend   | Render     |
| Media     | Cloudinary |

---

##  Challenges Solved

*  Implemented real-time communication using WebSockets
*  Managed synchronization across multiple users
*  Built complex group management system
*  Optimized MongoDB queries for performance
*  Designed secure authentication (JWT + refresh tokens)
*  Built admin analytics dashboard with Chart.js
*  Handled scalable media uploads with Cloudinary

---

##  Future Improvements

*  Push notifications
*  Mobile app version
*  End-to-end encryption (E2EE)
*  Video/voice calling feature
*  AI-based smart replies

---

##  Author

**Ankit Singh Chouhan**
Full Stack Developer

---

##  Why This Project Matters

This project demonstrates:

*  Real-time system design (WebSockets)
*  Event-driven backend architecture
*  Scalable chat system (like WhatsApp/Discord)
*  Secure authentication (JWT)
*  Full-stack development
*  Production deployment

---

##  Support

If you like this project, consider giving it a ⭐ on GitHub!
It motivates and helps in building more impactful projects 

---
