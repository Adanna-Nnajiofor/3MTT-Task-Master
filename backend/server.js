require("dotenv").config({ path: "./.env" });
console.log("MONGO_URI:", process.env.MONGO_URI);
const express = require("express");
const connectToDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", authMiddleware, taskRoutes);

connectToDB().then(
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
);
