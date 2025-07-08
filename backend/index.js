const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const port = process.env.PORT || 5000;

// Extended CORS configuration
const corsOptions = {
  origin: 'https://online-book-store-1-cqok.onrender.com',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'HEAD'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Length', 'X-Knowledge'], // optional
};

// Middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests globally
app.use(express.json());

// Routes
const bookRoutes = require('./src/books/book.route');
const orderRoutes = require("./src/orders/order.route");
const userRoutes = require("./src/users/user.route");
const adminRoutes = require("./src/stats/admin.stats");

app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

// Default route
app.use("/", (req, res) => {
  res.send("Book Store Server is running!");
});

// DB connection
async function main() {
  await mongoose.connect(process.env.DB_URL);
}

main()
  .then(() => console.log("MongoDB connected successfully!"))
  .catch(err => console.log("MongoDB connection error:", err));

// Server listen
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
