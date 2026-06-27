# ZECO — Full Stack Grocery Delivery App
### A Zepto-inspired grocery delivery platform built with Node.js, Express, MongoDB, and Vanilla JS

🌐 **Live Demo:** [zecoo.netlify.app](https://zecoo.netlify.app)  
🔧 **Backend API:** [zeco-backend.onrender.com](https://zeco-backend.onrender.com)  
📁 **GitHub:** [ShivangiP2005/Zeco-Mongo](https://github.com/ShivangiP2005/Zeco-Mongo)

---

## What is ZECO?

ZECO is a full-stack quick-commerce web application modelled after Zepto. Users can browse a product catalog, add items to cart, place orders with saved delivery addresses, track order status, and write product reviews. Admins get a dedicated dashboard with revenue analytics and order management.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3,JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose ODM |
| Auth | JWT (JSON Web Tokens), bcrypt |
| Security | Helmet.js, express-rate-limit |
| Deployment | Netlify (frontend), Render (backend) |

---

## Features

### User Features
- **Authentication** — Secure register/login with JWT tokens and bcrypt password hashing
- **Product Catalog** — Paginated product listing with server-side search and category filtering
- **Cart Management** — Add, remove, and update quantities with real-time total calculation
- **Saved Addresses** — Save multiple delivery addresses with pincode validation and default selection
- **Order Placement** — Checkout with address picker, delivery fee calculation, and COD payment
- **Order Tracking** — Visual 5-stage status timeline (Order Placed → Confirmed → Packed → Out for Delivery → Delivered)
- **Cancel Orders** — Cancel orders before they are packed, with business-rule enforcement
- **Product Reviews** — Star ratings and comments, one review per user per product enforced at DB level
- **Location Check** — Pincode serviceability check before ordering

### Admin Features
- **Dashboard Stats** — Total orders, users, products, and revenue at a glance
- **Revenue Analytics** — Bar chart of daily revenue for the last 7 days using MongoDB aggregation
- **Top Products** — Ranked list of best-selling products with progress bars
- **Order Management** — View all orders, update status with a dropdown selector
- **User Management** — View all registered users with their details

### Technical Highlights
- Input validation on both frontend (instant feedback) and backend (server-side enforcement)
- Unique constraints on email and phone at MongoDB schema level with `sparse` indexing
- Rate limiting — 200 requests/15 min globally, 10 requests/15 min on auth routes
- Secure HTTP headers via Helmet.js
- Pagination on product catalog with `skip/limit` and total page count
- MongoDB aggregation pipelines for revenue trends and top-selling product analytics
- Graceful error handling with loading spinners and retry buttons
- Responsive design for mobile, tablet, and desktop

---

## Project Structure

```
zeco/
├── backend/
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── middleware/
│   │   └── auth.js             # JWT protect + adminOnly middleware
│   ├── models/
│   │   ├── User.js             # User schema (name, email, phone, role)
│   │   ├── Product.js          # Product schema (name, price, category, stock)
│   │   ├── Cart.js             # Cart schema (user ref, items array)
│   │   ├── Order.js            # Order schema (items, status, address)
│   │   ├── Review.js           # Review schema (product ref, rating, comment)
│   │   └── Address.js          # Saved address schema (pincode, label)
│   ├── routes/
│   │   ├── auth.js             # POST /register, POST /login, GET /me
│   │   ├── products.js         # GET /products, GET /categories, GET /:id
│   │   ├── cart.js             # GET, POST, PUT, DELETE /cart
│   │   ├── orders.js           # POST, GET /orders, PUT /:id/cancel
│   │   ├── reviews.js          # GET, POST /reviews/:productId
│   │   ├── address.js          # GET, POST, DELETE /address
│   │   └── admin.js            # Stats, analytics, orders, users (admin only)
│   ├── seedProducts.js         # Seed script for initial product data
│   ├── server.js               # Express app entry point
│   └── .env                    # Environment variables (not committed)
└── frontend/
    ├── css/
    │   └── style.css           # All styles including responsive breakpoints
    ├── js/
    │   └── api.js              # Centralised fetch helper for all API calls
    ├── index.html              # Homepage — banner, categories, product grid
    ├── login.html              # Login page
    ├── signup.html             # Signup page with validation
    ├── product.html            # Product detail page with reviews
    ├── cart.html               # Cart with address picker and checkout
    ├── orders.html             # Order history with status timeline
    └── admin.html              # Admin dashboard (role-protected)
```

---

## Getting Started Locally

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier)

### 1. Clone the repo
```bash
git clone https://github.com/ShivangiP2005/Zeco-Mongo.git
cd Zeco-Mongo
```

### 2. Install backend dependencies
```bash
cd backend
npm install
```

### 3. Set up environment variables
Create a `.env` file inside `backend/`:
```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
```

### 4. Seed the database
```bash
node seedProducts.js
```

### 5. Start the backend
```bash
npm run dev
```

### 6. Open the frontend
Open `frontend/index.html` with Live Server in VS Code, or serve the `frontend/` folder with any static file server.

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login, returns JWT |
| GET | `/api/auth/me` | User | Get current user |
| GET | `/api/products` | No | Get products (paginated, filterable) |
| GET | `/api/products/categories` | No | Get all categories |
| GET | `/api/products/:id` | No | Get single product |
| GET | `/api/cart` | User | Get user's cart |
| POST | `/api/cart` | User | Add item to cart |
| PUT | `/api/cart/:productId` | User | Update item quantity |
| DELETE | `/api/cart/:productId` | User | Remove item from cart |
| POST | `/api/orders` | User | Place order |
| GET | `/api/orders` | User | Get order history |
| PUT | `/api/orders/:id/cancel` | User | Cancel order |
| GET | `/api/reviews/:productId` | No | Get product reviews |
| POST | `/api/reviews/:productId` | User | Submit review |
| GET | `/api/address` | User | Get saved addresses |
| POST | `/api/address` | User | Save new address |
| DELETE | `/api/address/:id` | User | Delete address |
| GET | `/api/admin/stats` | Admin | Dashboard stats |
| GET | `/api/admin/analytics` | Admin | Revenue + top products |
| GET | `/api/admin/orders` | Admin | All orders |
| PUT | `/api/admin/orders/:id` | Admin | Update order status |
| GET | `/api/admin/users` | Admin | All users |

---

## Security

- Passwords hashed with bcrypt (salt rounds: 10) — raw passwords never stored
- JWT tokens expire after 7 days
- Admin routes protected by role check middleware
- Rate limiting: 10 auth attempts per 15 minutes per IP
- Helmet.js sets secure HTTP response headers
- `.env` file excluded from version control via `.gitignore`
- Unique email and phone enforced at database schema level

---

## Known Limitations

- Free tier on Render spins down after inactivity — first request after idle may take ~30 seconds
- No real payment gateway — currently Cash on Delivery only
- No real-time order updates between admin and user — requires page refresh
- Images sourced from Unsplash CDN — dependent on external service availability

---

## Author

**Shivangi Pandey**  
[GitHub](https://github.com/ShivangiP2005) · [LinkedIn](https://www.linkedin.com/in/shivangi-pandey-976aa9285/)

---

*Built as a full-stack portfolio project demonstrating end-to-end web development with Node.js, Express, MongoDB, and JavaScript.*