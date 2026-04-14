# E-commerce Multiseller Marketplace

This project is a full-stack e-commerce multiseller marketplace built with Next.js (frontend), Node.js (backend), PostgreSQL, MongoDB, and Stripe Connect for payments.

## Features
- Multi-role authentication (Buyer, Seller, Admin, Super Admin)
- Product management (CRUD)
- Stripe multiseller payments with platform fee
- Modular monorepo structure

## Tech Stack
- Frontend: Next.js (React)
- Backend: Node.js (Express.js)
- Database: PostgreSQL (main), MongoDB (catalog)
- Payments: Stripe Connect

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)

### 1. Install Dependencies
In the project root, run:

```
npm install --legacy-peer-deps
```

### 2. Run the Backend (API)
Open a terminal and run:

```
cd apps/backend
npm install --legacy-peer-deps
npm run dev
```
The backend server will start on http://localhost:5000

### 3. Run the Frontend (Next.js)
Open another terminal and run:

```
cd apps/frontend
npm install --legacy-peer-deps
npm run dev
```
The frontend will start on http://localhost:3000

### 4. Access the App
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Notes
- The current authentication uses in-memory storage (not persistent).
- For production, configure PostgreSQL, MongoDB, and Stripe credentials in environment variables.
