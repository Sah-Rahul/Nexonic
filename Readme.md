# 🛒 Nexonic — Full-Stack E-Commerce Platform

A fully featured, production-grade **E-Commerce platform** built with a modern and scalable architecture using **React, TypeScript, Node.js, Express, MongoDB, Stripe, TailwindCSS, and Shadcn UI**.

This project includes complete **User Authentication**, **Cart System**, **Wishlist**, **Order Placement**, **Payment Integration**, and a powerful **Admin Dashboard** with analytics.

---

## ✨ Features

### 👤 User Features

| Feature                    | Description                                      |
| -------------------------- | ------------------------------------------------ |
| 🔐 **Authentication**      | Signup, Login, Logout with JWT                   |
| 🔑 **Password Management** | Forgot Password, Reset Password, Change Password |
| 👤 **User Profile**        | Update info, change image (Cloudinary)           |
| 🛒 **Shopping Cart**       | Add/remove items, quantity update                |
| ❤️ **Wishlist**            | Save products for later                          |
| 💳 **Stripe Payments**     | Secure payment processing                        |
| 📦 **Orders**              | Track orders, view history                       |
| 📱 **Responsive UI**       | Mobile-first design                              |

---

### 🛡 Admin Features

| Feature                   | Description                                     |
| ------------------------- | ----------------------------------------------- |
| 📊 **Admin Dashboard**    | Overview of users, products & orders            |
| 📦 **Product Management** | Add, edit, delete products                      |
| 🧑‍🤝‍🧑 **User Management**    | View all users                                  |
| 🛒 **Order Management**   | Update status: Processing → Shipped → Delivered |
| 📈 **Analytics**          | Revenue charts, order stats                     |
| 💾 **Cloudinary**         | Product image upload                            |

---

## 🛠 Tech Stack

### **Frontend**

| Tech               | Purpose              |
| ------------------ | -------------------- |
| ⚛ React 18         | UI development       |
| 🟦 TypeScript      | Type safety          |
| 🎨 Tailwind CSS    | Styling              |
| 🧩 Shadcn UI       | Modern UI Components |
| 🔄 Redux Toolkit   | Global state         |
| 📡 TanStack Query  | Server state         |
| ✨ Zod             | Schema validation    |
| 🛣 React Router v6  | Routing              |
| 💳 Stripe          | Payments             |
| 🔔 React-hot-toast | Toast notifications  |
| 📊 Recharts        | Admin charts         |

---

### **Backend**

| Tech          | Purpose                |
| ------------- | ---------------------- |
| 🟢 Node.js    | Server                 |
| ⚡ Express.js | API Framework          |
| 🍃 MongoDB    | Database               |
| 🔗 Mongoose   | ODM                    |
| 🔐 JWT        | Authentication         |
| 🔒 Bcrypt     | Password hashing       |
| ☁ Cloudinary  | Image upload           |
| 💳 Stripe     | Payment processing     |
| 📧 Nodemailer | Email (Password Reset) |

---

## 📁 Project Structure

# 🛒 Nexonic E-Commerce Platform

A full-stack modern e-commerce platform built with **React**, **Node.js**, **Express**, **MongoDB**, and **Stripe** payment integration.

![Nexonic Banner](https://your-banner-image-url.com/banner.png)

---

## 🚀 Live Demo

- **Frontend:** [https://nexonic.vercel.app](https://nexonic.vercel.app)
- **Backend API:** [https://api.nexonic.com](https://api.nexonic.com)

---

## ✨ Features

### 👤 User Features

- 🔐 Authentication (Signup, Login, Logout)
- 🔑 Password Management (Forgot, Reset, Change Password)
- 👤 Profile Management (Update Profile, Image Upload)
- 🛒 Shopping Cart
- ❤️ Wishlist
- 📦 Order Tracking
- 💳 Stripe Payment

### 🛡️ Admin Features

- 📊 Dashboard with Analytics
- 👥 User Management
- 📦 Product Management (CRUD)
- 🛒 Order Management (Status Update)
- 📈 Revenue Tracking with Charts

---

## 🛠️ Tech Stack

### Frontend

| Technology      | Purpose       |
| --------------- | ------------- |
| React 18        | UI Library    |
| TypeScript      | Type Safety   |
| Tailwind CSS    | Styling       |
| Shadcn/ui       | UI Components |
| Redux Toolkit   | Global State  |
| TanStack Query  | Server State  |
| React Router v6 | Routing       |
| Zod             | Validation    |
| Stripe          | Payment       |

### Backend

| Technology | Purpose        |
| ---------- | -------------- |
| Node.js    | Runtime        |
| Express.js | Framework      |
| MongoDB    | Database       |
| Mongoose   | ODM            |
| JWT        | Authentication |
| Cloudinary | Image Upload   |
| Zod        | Validation     |
| Stripe     | Payment        |

---

## 📁 Project Structure

# 🛒 Nexonic E-Commerce Platform

A full-stack modern e-commerce platform built with **React**, **Node.js**, **Express**, **MongoDB**, and **Stripe** payment integration.

![Nexonic Banner](/client/public/images/home.png)

---

## ✨ Features

### 👤 User Features

- 🔐 Authentication (Signup, Login, Logout)
- 🔑 Password Management (Forgot, Reset, Change Password)
- 👤 Profile Management (Update Profile, Image Upload)
- 🛒 Shopping Cart
- ❤️ Wishlist
- 📦 Order Tracking
- 💳 Stripe Payment

### 🛡️ Admin Features

- 📊 Dashboard with Analytics
- 👥 User Management
- 📦 Product Management (CRUD)
- 🛒 Order Management (Status Update)
- 📈 Revenue Tracking with Charts

---

## 🛠️ Tech Stack

### Frontend

| Technology      | Purpose       |
| --------------- | ------------- |
| React 18        | UI Library    |
| TypeScript      | Type Safety   |
| Tailwind CSS    | Styling       |
| Shadcn/ui       | UI Components |
| Redux Toolkit   | Global State  |
| TanStack Query  | Server State  |
| React Router v6 | Routing       |
| Zod             | Validation    |
| Stripe          | Payment       |

### Backend

| Technology | Purpose        |
| ---------- | -------------- |
| Node.js    | Runtime        |
| Express.js | Framework      |
| MongoDB    | Database       |
| Mongoose   | ODM            |
| JWT        | Authentication |
| Cloudinary | Image Upload   |
| Zod        | Validation     |
| Stripe     | Payment        |

---

## 📁 Project Structure

### 📂 Client (Frontend)

```
client/
├── node_modules/
├── public/
├── src/
│   ├── Admin/              # Admin dashboard pages
│   ├── AllJsonData/        # Static JSON data
│   ├── api/                # API functions (Axios)
│   ├── assets/             # Images, icons, fonts
│   ├── Auth/               # Auth pages (Login, Signup, etc.)
│   ├── components/         # Reusable UI components
│   ├── context/            # React Context providers
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── pages/              # User pages
│   ├── redux/              # Redux store & slices
│   ├── Routes/             # Route configurations
│   ├── types/              # TypeScript type definitions
│   ├── zodValidation/      # Zod validation schemas
│   ├── App.css             # Global styles
│   ├── App.tsx             # Main App component
│   ├── index.css           # Tailwind imports
│   └── main.tsx            # Entry point
├── .env                    # Environment variables
├── .gitignore
├── components.json         # Shadcn/ui config
├── eslint.config.js
├── package.json
└── tsconfig.json
```

### 📂 Server (Backend)

```
server/
├── node_modules/
├── src/
│   ├── config/             # Database & Cloudinary config
│   ├── constants/          # App constants
│   ├── controller/         # Request handlers
│   ├── emailTemplates/     # Email HTML templates
│   ├── middleware/         # Auth, Error middlewares
│   ├── models/             # Mongoose models
│   ├── routes/             # API route definitions
│   ├── types/              # TypeScript types
│   ├── utils/              # Helper functions
│   ├── zodSchema/          # Zod validation schemas
│   ├── app.ts              # Express app setup
│   └── server.ts           # Server entry point
├── .env                    # Environment variables
├── .env.example            # Example env file
├── .gitignore
├── package.json
├── package-lock.json
└── tsconfig.json
```

---

## ⚙️ Environment Variables

### Server (`server/.env`)

```env
# Server
PORT=3000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nexonic

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

# Email SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your_app_password
```

### Client (`client/.env`)

```env
VITE_API_URL=http://localhost:3000
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

---

## 📡 API Endpoints

### 🔐 Authentication

| Method | Endpoint                      | Description       |
| ------ | ----------------------------- | ----------------- |
| `POST` | `/auth/signup`                | Register new user |
| `POST` | `/auth/login`                 | Login user        |
| `POST` | `/auth/logout`                | Logout user       |
| `POST` | `/auth/forgot-password`       | Send reset email  |
| `POST` | `/auth/reset-password/:token` | Reset password    |
| `PUT`  | `/auth/change-password`       | Change password   |
| `PUT`  | `/auth/update-profile`        | Update profile    |

### 📦 Products

| Method   | Endpoint        | Description        | Access |
| -------- | --------------- | ------------------ | ------ |
| `GET`    | `/products`     | Get all products   | Public |
| `GET`    | `/products/:id` | Get single product | Public |
| `POST`   | `/products`     | Create product     | Admin  |
| `PUT`    | `/products/:id` | Update product     | Admin  |
| `DELETE` | `/products/:id` | Delete product     | Admin  |

### 🛒 Orders

| Method | Endpoint           | Description         | Access |
| ------ | ------------------ | ------------------- | ------ |
| `POST` | `/order`           | Create order        | User   |
| `GET`  | `/order/my-orders` | Get user's orders   | User   |
| `GET`  | `/order`           | Get all orders      | Admin  |
| `PUT`  | `/order/:id`       | Update order status | Admin  |

### 👥 Users

| Method   | Endpoint     | Description     | Access |
| -------- | ------------ | --------------- | ------ |
| `GET`    | `/users`     | Get all users   | Admin  |
| `GET`    | `/users/:id` | Get single user | Admin  |
| `DELETE` | `/users/:id` | Delete user     | Admin  |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB
- Stripe Account
- Cloudinary Account

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/nexonic.git
cd nexonic
```

2. **Setup Backend**

```bash
cd server
npm install
npm run dev
```

3. **Setup Frontend**

```bash
cd client
npm install
npm run dev
```

---

## 📸 Screenshots

### User Pages

| Home Page                               | Product Details                               |
| --------------------------------------- | --------------------------------------------- |
| ![Home](/client/public/images/home.png) | ![Product](/client/public/images/product.png) |

| Shopping Cart                           | Checkout                                       |
| --------------------------------------- | ---------------------------------------------- |
| ![Cart](/client/public/images/cart.png) | ![Checkout](/client/public/images/payment.png) |

### Admin Dashboard

| Dashboard                                         | Orders Management                          |
| ------------------------------------------------- | ------------------------------------------ |
| ![Dashboard](/client/public/images/dashboard.png) | ![Orders](/client/public/images/order.png) |

---

## 🔒 Security Features

- ✅ JWT Authentication
- ✅ Password Hashing (Bcrypt)
- ✅ Protected Routes
- ✅ Role-based Access Control
- ✅ Input Validation (Zod)

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 👨‍💻 Author

**Rahul Sah**

- GitHub: [@rahulsah](https://github.com/Sah-Rahul)
- LinkedIn: [Rahul Sah](https://www.linkedin.com/in/rahul-sah-6ba0a5346/)

---

## ⭐ Support

Give a ⭐ if you like this project!

---

Made with ❤️ by **Rahul Sah**
