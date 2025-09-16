const mongoose = require("mongoose");

const { MONGO_URI, NODE_ENV } = process.env;

class Database {
  constructor() {
    this.isConnected = false;
    this._connect();
  }

  async _connect() {
    try {
      if (!MONGO_URI) {
        throw new Error("MONGO_URI is not defined in environment variables");
      }

      const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4,
        maxPoolSize: 10,
        retryWrites: true,
        w: "majority",
      };

      await mongoose.connect(MONGO_URI, options);

      this.isConnected = true;
      console.log("MongoDB connected successfully");
      console.log(`Host: ${mongoose.connection.host}`);
      console.log(`Database: ${mongoose.connection.name}`);
      console.log(`Environment: ${NODE_ENV || "development"}`);
    } catch (error) {
      console.error("MongoDB connection error:", error.message);

      if (NODE_ENV === "production") {
        process.exit(1);
      }
    }
  }

  _setupEventListeners() {
    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to MongoDB");
      this.isConnected = true;
    });

    mongoose.connection.on("error", (err) => {
      console.error("Mongoose connection error:", err);
      this.isConnected = false;
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose disconnected from MongoDB");
      this.isConnected = false;
    });

    process.on("SIGINT", this._gracefulShutdown);
    process.on("SIGTERM", this._gracefulShutdown);
  }

  _gracefulShutdown = async () => {
    try {
      await mongoose.connection.close();
      console.log("MongoDB connection closed through app termination");
      process.exit(0);
    } catch (error) {
      console.error("Error closing MongoDB connection:", error);
      process.exit(1);
    }
  };

  getConnectionStatus() {
    return this.isConnected;
  }

  getMongoose() {
    return mongoose;
  }

  getNativeClient() {
    return mongoose.connection.getClient();
  }
}

const database = new Database();
module.exports = database;
