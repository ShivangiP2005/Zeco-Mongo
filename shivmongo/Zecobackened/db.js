// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://ShivangiZeco:Zecoshivangi%402025@zecocluster.iimr7a3.mongodb.net/ZecoDB?retryWrites=true&w=majority&appName=Zecocluster', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected!");
  } catch (err) {
    console.error("❌ MongoDB connection failed", err);
    process.exit(1);
  }
};

module.exports = connectDB;
