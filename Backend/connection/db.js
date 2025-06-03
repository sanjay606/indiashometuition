import mongoose from "mongoose";
import chalk from "chalk";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Validate environment variable for MongoDB connection
if (!process.env.MONGO_URL) {
  console.error(chalk.bgRed.white("Error: MONGO_URL is not defined in environment variables"));
  process.exit(1);
}

const connectDB = async () => {
  console.log("Attempting to connect to MongoDB...");

  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true, // Parses MongoDB connection string
      useUnifiedTopology: true, // Ensures compatibility with the MongoDB driver
      useFindAndModify: false, // Avoid deprecated findAndModify
      useCreateIndex: true, // Use new index creation methods
    });
    console.log(chalk.bgGreen.white(`MongoDB Connected: ${conn.connection.host}`));
  } catch (error) {
    console.error(chalk.bgRed.white(`MongoDB Connection Error: ${error.message}`));
    console.log("Retrying connection in 5 seconds...");
    setTimeout(connectDB, 5000); // Retry connection after 5 seconds
  }
};

// Mongoose connection events for monitoring
mongoose.connection.on("connected", () => {
  console.log(chalk.bgGreen.white("Mongoose connection established"));
});

mongoose.connection.on("error", (err) => {
  console.error(chalk.bgRed.white(`Mongoose connection error: ${err}`));
});

mongoose.connection.on("disconnected", () => {
  console.log(chalk.bgYellow.black("Mongoose connection disconnected"));
});

// Graceful shutdown handling
const gracefulExit = async (signal) => {
  console.log(chalk.bgYellow.black(`${signal} signal received: Closing MongoDB connection...`));
  await mongoose.connection.close();
  console.log(chalk.bgRed.white("MongoDB connection closed due to app termination"));
  process.exit(0);
};

// Handle process termination signals
process.on("SIGINT", () => gracefulExit("SIGINT"));
process.on("SIGTERM", () => gracefulExit("SIGTERM"));

export default connectDB;
