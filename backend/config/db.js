const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });

const uri = process.env.MONGO_URI; 

const connectToDB = async () => {
  if (!uri) {
    console.error("MONGO_URI is undefined. Please check your .env file.");
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); 
  }
};

module.exports = connectToDB;
