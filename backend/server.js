require("dotenv").config({ path: "./backend/.env" });
console.log("MONGO_URI:", process.env.MONGO_URI);
const express = require("express");
const mongoose = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", authMiddleware, taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
