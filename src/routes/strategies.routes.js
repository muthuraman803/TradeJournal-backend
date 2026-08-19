import { Router } from "express";
import {
  listStrategies,
  createStrategy,
  updateStrategy,
  deleteStrategy
} from "../controllers/strategies.controller.js";

const router = Router();

router.get("/", listStrategies);
router.post("/", createStrategy);
router.put("/:id", updateStrategy);
router.delete("/:id", deleteStrategy);

export default router;
