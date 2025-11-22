//this is the order the imports are supposed to follow for index.js


import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import swaggerDocs from "./swagger/swagger.js";
import connectDb from "./services/db.services.js";

// routes
import swaggerRoute from "./routes/swagger.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Connect DB
connectDb();

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONT_END,
    credentials: true,
  })
);

// Swagger Docs
swaggerDocs(app, port);

// Routes
app.use(swaggerRoute);

// Universal error handler
app.use((error, req, res, next) => {
  return res
    .status(error.status || 500)
    .json({ message: error.message || "Something went wrong" });
});

// LISTENING (fix)
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
