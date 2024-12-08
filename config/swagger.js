import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Determine the server URL based on the environment
const ENV = process.env.ENV || "Local"; // Default to 'Local' if ENV is not set
const serverUrl =
  ENV === "Prod"
    ? "https://task-app-node.onrender.com"
    : "http://localhost:3003";

// Define Swagger options
const options = {
  definition: {
    openapi: "3.0.0", // OpenAPI version
    info: {
      title: "Task Management API", // API title
      version: "1.0.0", // API version
      description: "A simple API for managing tasks", // Description
      contact: {
        name: "Suryakanta Prusty", // Your name
        email: "kantaprustys@gmail.com", // Your email
      },
    },
    servers: [
      {
        url: serverUrl, // Dynamically set the base URL
      },
    ],
  },
  apis: ["./route/*.js", "./controller/*.js"], // Path to your routes and controller files
};

// Initialize Swagger documentation
const swaggerSpec = swaggerJSDoc(options);

// Swagger UI Setup
const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Access docs at /api-docs
};

export { swaggerSpec, swaggerDocs };
