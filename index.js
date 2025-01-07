import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import connectToMongo from "./config/dbConfig.js";
import userRoutes from "./route/userRoutes.js";
import taskRoutes from "./route/taskRoutes.js";
import authRoutes from "./route/authRoutes.js";
import logger from "./utils/logger.js";
import { swaggerDocs } from "./config/swagger.js";

dotenv.config();

const morganFormat = ":method :url :status :response-time ms";

const app = express();

// CORS Configuration
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:5173", // Local development frontend
      "https://task-app-frontend-yb58.onrender.com", // Production frontend
    ];

    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  credentials: true,
};

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Debug: Log received cookies
app.use((req, res, next) => {
  console.log("Cookies received:", req.cookies);
  next();
});

// Debug: Log received headers (optional)
app.use((req, res, next) => {
  console.log("Headers received:", req.headers);
  next();
});

// Logging requests
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`The Server is Running on PORT: ${PORT}`);
  connectToMongo();
});
