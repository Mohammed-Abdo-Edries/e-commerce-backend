const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to:", process.env.MONGO_URI);

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ Connected");
    console.log(conn.connection.host);
  } catch (error) {
    console.log("========== ERROR ==========");
    console.dir(error, { depth: null });
    console.log("===========================");
    process.exit(1);
  }
};

module.exports = connectDB;