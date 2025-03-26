import express from "express";
import { zipSlip } from "../controllers/zipSlipController.js";

import { getValidationRules } from "../utils/validationRules.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  getByNameOwasp,
  owaspChangeStatus,
} from "../controllers/owaspController.js";
const router = express.Router();

let validationRulesFromDB = [
  { field: "name", type: "required" },
  { field: "status", type: "required" },
];

router.post(
  "/change-status",
  authMiddleware,
  getValidationRules(validationRulesFromDB),
  owaspChangeStatus
);

router.get("/get-by-name", authMiddleware, getByNameOwasp);

export default router;
