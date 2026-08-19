import { Router } from "express";
import { listTrades, createTrade, updateTrade, deleteTrade } from "../controllers/trades.controller.js";

const router = Router();

router.get("/", listTrades);
router.post("/", createTrade);
router.put("/:id", updateTrade);
router.delete("/:id", deleteTrade);

export default router;
