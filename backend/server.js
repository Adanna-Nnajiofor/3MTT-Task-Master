require("dotenv").config({ path: "./.env" });
const express = require("express");
const cors = require("cors"); 
const connectToDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const authMiddleware = require("./middleware/authMiddleware");

// Environment variables
const PORT = process.env.PORT || 5000;

const app = express();

// CORS middleware configuration
app.use(
  cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


// Middleware to parse JSON
app.use(express.json());

// Enable CORS
app.use(cors()); 

// Routes
app.use("/api/auth", authRoutes); 
app.use("/api/tasks", authMiddleware, taskRoutes); 

// Connect to the database and start the server
connectToDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1); 
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong, please try again later." });
});
