import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import tradesRoutes from "./routes/trades.routes.js";
import strategiesRoutes from "./routes/strategies.routes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

const allowedOrigins = [
  "https://trade-jornals.vercel.app" || "http://localhost:5173",

];

// CORS
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an origin
      // (Postman, server-to-server requests, etc.)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error(`CORS: Origin ${origin} is not allowed`)
      );
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Handle preflight requests
app.options("*", cors());

// Parse JSON
app.use(express.json({ limit: "5mb" }));

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    ok: true,
    message: "Trading Journal API is running",
  });
});

// API routes
app.use("/api/trades", tradesRoutes);
app.use("/api/strategies", strategiesRoutes);

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Trading Journal API running on port ${PORT}`);
});

export default app;