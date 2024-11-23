import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

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
        url: "http://localhost:3003", // Base URL of the API
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
