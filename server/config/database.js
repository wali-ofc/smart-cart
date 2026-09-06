const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/FYP');
    console.log(`MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    // Ignore exit in development if mongod isn't running to prevent crash loops
  }
};

module.exports = connectDB;