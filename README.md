# AuraMatch - Matrimony Web Application (Client Side)

AuraMatch is a full-stack Matrimony platform built using the **MERN stack** (MongoDB, Express, React, Node.js) along with **Firebase Authentication** and **Stripe for payment integration**. This is the **client-side** of the project, built using **React, Tailwind CSS, and React Router**.

🔗 **Live Website:** [https://aura-match-client.vercel.app](https://aura-match-client.vercel.app)  
🔗 **Server Repository:** [https://github.com/alimran74/aura-match-server](https://github.com/alimran74/aura-match-server)

---

## 🔐 Admin Credentials

You can log in as an admin using the following credentials:

Email: aura@admin.com
Password: 748596



---

## 🔑 Features Overview

### 🔸 Authentication & Authorization

- Firebase email/password signup & login
- Google OAuth login
- JWT-based route protection
- Role-based access for:
  - Users
  - Premium users
  - Admins

---

### 👤 User Features

- Register and login using email/password or Google
- Role assigned as `"user"` by default
- Can **create a biodata** if they don’t have one
- Can **edit their biodata**
- Can view all public biodata
- Can send a **Contact Request** to other biodata
- Need to pay `$5` via Stripe to send contact request
- Premium badge will be shown on profile upon approval

---

### 💎 Premium Feature Flow

- After biodata creation, users can:
  - Click **"Make Biodata Premium"**
  - A confirmation modal opens
  - Sends request to admin for premium approval
- Once admin approves, biodata becomes premium

---

### 🧑‍💻 Admin Features

- View all user biodata and filter by:
  - All / Male / Female / Premium
- View all contact requests sent by users
- **Approve contact requests** (updates user role to premium and unlocks contact info)
- View biodata premium requests and approve
- Admin Dashboard Summary:
  - Total Biodata
  - Male / Female count
  - Premium count
  - Total Revenue

---

### 💳 Stripe Payment Integration

- Users must pay **$5 USD** to send a contact request
- Payment is done securely via Stripe
- Once payment is successful, request is submitted to admin

---

### 📁 Project Structure

📦 aura-match-client
├── src
│ ├── auth
│ ├── components
│ ├── layouts
│ ├── pages
│ ├── routes
│ ├── hooks
│ ├── context
│ └── utils



---

## 🧪 Tech Stack

- React.js
- React Router
- Tailwind CSS
- Firebase Auth
- Axios & JWT
- Stripe Payment
- TanStack React Query
- SweetAlert2 & Toastify
- Vercel Deployment

---

## 📌 How to Run Locally

1. Clone the repo:

   ```bash
   git clone https://github.com/alimran74/aura-match-client.git
   cd aura-match-client
Install dependencies:


npm install
Add .env file with your Firebase config and server URL:

makefile

VITE_API_URL=https://your-server-url.vercel.app
VITE_FIREBASE_API_KEY=xxxxxxxxxxxx
VITE_FIREBASE_AUTH_DOMAIN=xxxxxxxxxxxx
...
Start the dev server:

bash

npm run dev

---
📧 Contact
Built with ❤️ by Al Imran
Feel free to connect: https://www.linkedin.com/in/alimran74



---


