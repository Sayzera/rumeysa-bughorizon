import { validationResult } from "express-validator";
import { zipSlipService } from "../services/zipSlipService.js";

export const zipSlip = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const result = await zipSlipService(req);

    res.status(201).json({
      message: "ZipSlip başarıyla oluşturuldu",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "ZipSlip oluşturulurken bir hata oluştu",
      error: error.message,
    });
  }
};
