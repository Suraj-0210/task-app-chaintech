import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors"; // Import the cors package

import connectToMongo from "./config/dbConfig.js";
import userRoutes from "./route/userRoutes.js";
import taskRoutes from "./route/taskRoutes.js";
import authRoutes from "./route/authRoutes.js";
import logger from "./utils/logger.js";
import { swaggerDocs } from "./config/swagger.js";

import path from "path";

dotenv.config();
const morganFormat = ":method :url :status :response-time ms";

const app = express();

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:5173", // Local development frontend
      "https://task-app-frontend-yb58.onrender.com", // Production frontend
    ];

    // If the request origin is in the allowedOrigins list or if there's no origin (for certain requests like curl or Postman)
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allows cookies to be sent with requests
};

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions)); // Enable CORS for all routes

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ Message: "You are Good to GO." });
});

swaggerDocs(app);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`The Server is Running on PORT: ${PORT}`);
  connectToMongo();
});
