import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import tradesRoutes from "./routes/trades.routes.js";
import strategiesRoutes from "./routes/strategies.routes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;
const CLIENT_ORIGIN =
  process.env.CLIENT_ORIGIN || "http://localhost:5173";

// CORS
app.use(
  cors({
    origin: CLIENT_ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

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

// Render provides PORT automatically
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Trading Journal API running on port ${PORT}`);
});

export default app;