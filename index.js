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

const __diname = path.resolve();

const corsOptions = {
  origin: [
    "https://task-app-8fjy.onrender.com", // Frontend URL in production
  ], // Your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // This allows cookies to be sent with requests
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

app.use(express.static(path.join(__diname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__diname, "client", "dist", "index.html"));
});

app.get("/", (req, res) => {
  res.json({ Message: "You are Good to GO." });
});

swaggerDocs(app);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`The Server is Running on PORT: ${PORT}`);
  connectToMongo();
});
