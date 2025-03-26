import express from "express";
import { zipSlip } from "../controllers/zipSlipController.js";

import { getValidationRules } from "../utils/validationRules.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();


const validationRulesFromDB = [
  { field: "name", type: "required" },
  { field: "address", type: "required" },
  { field: "address", type: "minLength", value: 5 },
  {
    field: "file",
    type: "file",
    allowedExtensions: ["jpg", "jpeg", "png", "pdf", "zip"],
    maxSize: 1024 * 1024 * 5, // 5MB
  },
];

router.post(
  "/upload",
  authMiddleware,
  getValidationRules(validationRulesFromDB),
  zipSlip
);

export default router;
