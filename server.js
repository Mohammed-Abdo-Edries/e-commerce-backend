require("dotenv").config();

const app = require("./app");
const { sequelize, connectDB } = require("./config/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    await await sequelize.sync({ alter: true });

    console.log("✅ Database tables synchronized");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();