# 🛍️ Next.js E-Commerce with Midtrans Demo

A simple e-commerce demo built with [Next.js](https://nextjs.org/). Features include product listing, product detail, checkout, order storage, and an order history page.

---

## 🚀 Features

- 🛒 View products
- 🔍 Product details
- 💳 Checkout and payment (mocked)
- 📦 View order history grouped by status
- 🧳 JSON-based backend data (no DB setup needed)
- ✨ Clean UI with Tailwind CSS

---

## 📂 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── orders/        # API route for order data
│   │   ├── payment/
│   │   │   ├── token/     # Generate Midtrans Snap token
│   │   │   └── webhook/   # Webhook endpoint to handle payment status updates
│   │   └── products/      # API route for products data
│   ├── orders/            # UI page for listing orders by status
│   ├── products/
│   │   └── [id]/          # Dynamic product detail route
│   ├── checkout/          # Checkout UI logic
│   ├── layout.js          # Shared layout
│   ├── page.js            # Home page
│   └── globals.css        # Styling
├── components/
│   └── features/          # UI components by feature
├── data/
│   ├── orders.json        # Mock orders data
│   └── products.json      # Mock products data
└── libs/
    └── orders.js          # Utility functions to manage order data
```

---

## 🛠️ Setup

1. **Clone the repo**

```bash
git clone https://github.com/deswinar/nextjs-midtrans-demo.git
cd nextjs-midtrans-demo
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the app**

```bash
npm run dev
```

> Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 📦 Tech Stack

- [Next.js 15+ (App Router)](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- JSON File Storage (No DB)

---

> Created for learning purposes.

