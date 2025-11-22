import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import "dotenv/config"

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API Documentation",
      version: "1.0.0",
      description: "API documentation for my backend",
    },
    servers: [
      {
        url: process.env.BACKEND_URL || "http://localhost:8000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export function swaggerDocs(app, port) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`📘 Swagger Docs running at http://localhost:${port}/api-docs`);
}
