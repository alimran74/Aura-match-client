# 💍 AuraMatch - Matrimony Web Application (Client Side)

AuraMatch is a modern, user-friendly full-stack **Matrimony Web Platform** built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). This repository contains the **client-side** code powered by **React**, **Tailwind CSS**, **Firebase Authentication**, **Stripe Payments**, and **JWT Authorization**.

🌐 **Live Website:** [https://aura-match-client.vercel.app](https://aura-match-client.vercel.app)  
📁 **Server Repository:** [https://github.com/alimran74/aura-match-server](https://github.com/alimran74/aura-match-server)

---

## 🔐 Admin Credentials

To explore the admin dashboard features:

- **Email:** `aura@admin.com`  
- **Password:** `748596`

---

## ✨ Features at a Glance

### 🔑 Authentication & Authorization

✅ Email/Password registration via **Firebase Auth**  
✅ Google OAuth login  
✅ **JWT token-based** route protection  
✅ Role-based access for:
- 👤 Normal Users
- 💎 Premium Users
- 🛠️ Admins

---

### 👥 User Functionalities

- 📝 **Register/Login** with email/password or Google
- 🆕 New users are assigned role: `user`
- 🧬 Can **create a biodata** (profile)
- 🖋️ **Edit biodata** anytime
- 🔍 View all public biodata (other users)
- 📩 Send **Contact Request** to biodata profiles (paid feature)
- 💵 Pay **$5 USD** to send contact request (via Stripe)
- 🎖️ Premium badge shown on biodata after approval

---

### 💎 Premium Biodata Flow

- 🧬 After biodata creation, users can click on **"Make Biodata Premium"**
- ✅ Confirmation modal appears
- 📤 Sends a premium request to admin
- 🛠️ Admin reviews and approves
- 🌟 Biodata gets a **Premium Status** & badge

---

### 🧑‍💼 Admin Functionalities

- 📊 **Admin Dashboard** with key summaries:
  - 🔢 Total Biodata
  - 👨 Male Biodata Count
  - 👩 Female Biodata Count
  - 💎 Premium Biodata Count
  - 💰 Total Revenue (from Stripe)
  
- 🧬 View & filter **all biodata**
  - Filter by: All | Male | Female | Premium
- ✅ **Approve Premium Biodata** requests
- 📩 View **Contact Requests**
  - Approve to unlock contact info
  - Updates user's role to `premium`

---

### 💳 Stripe Payment Integration

- 🔐 Secure payment gateway using **Stripe**
- 💵 Cost: `$5 USD` per contact request
- ⏳ Once paid:
  - Request is sent to admin
  - User is eligible to receive contact info upon approval

---

## 🧱 Project Structure


📁 aura-match-client/
├── src/
│ ├── auth/ # Firebase authentication logic
│ ├── components/ # Shared components (navbar, cards, etc.)
│ ├── context/ # Auth and global context providers
│ ├── hooks/ # Custom React hooks
│ ├── layouts/ # Page layouts (main, dashboard)
│ ├── pages/ # Page components
│ ├── routes/ # Protected & public route logic
│ └── utils/ # Utility functions/helpers


---


## ⚙️ Tech Stack

| Technology        | Use Case                         |
|-------------------|----------------------------------|
| **React**         | Frontend UI framework            |
| **Tailwind CSS**  | Responsive styling               |
| **Firebase**      | Authentication (email & Google)  |
| **Axios + JWT**   | Secure API requests              |
| **React Router**  | Navigation and route protection  |
| **Stripe**        | Payment integration              |
| **TanStack Query**| API data management & caching    |
| **SweetAlert2**   | Alert modals                     |
| **React Toastify**| Toast notifications              |
| **Vercel**        | Deployment                       |

---

## 🧪 Installation & Setup (Local Development)

1. **Clone the repository**

```bash
git clone https://github.com/alimran74/aura-match-client.git
cd aura-match-client
npm install

2. **Create .env file in root directory**

Add your Firebase and server credentials:

env

VITE_API_URL=https://your-server-url.vercel.app
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

Run the development server

```bash

npm run dev

----



Now open your browser and visit:
📍 http://localhost:5173

🖼️ Preview
Here are some pages available:

🔐 Login & Register Pages

🧬 Create/Edit Biodata

📋 Biodata List Page

💳 Stripe Checkout Page

🛠️ Admin Dashboard

📦 Request & Approval Panels

----


🔗 Useful Links
🔥 Firebase Docs: firebase.google.com

💳 Stripe Docs: stripe.com/docs

🧠 React Query Docs: tanstack.com/query

🛠️ React Router Docs: reactrouter.com

📬 Contact
Feel free to connect and follow my work:

👨‍💻 Al Imran

🌐 LinkedIn

📧 alimrandev.1@gmail.com



❤️ Special Thanks
Thanks to the Programming Hero web development curriculum and mentors for guidance and inspiration throughout the project!


🔒 Built with passion, powered by React, and deployed with love! 

develop by AL IMRAN with ❤️

