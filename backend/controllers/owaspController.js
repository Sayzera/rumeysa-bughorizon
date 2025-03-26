import { validationResult } from "express-validator";
import {
  getByNameOwaspService,
  owaspListService,
} from "../services/owaspService.js";

export const owaspChangeStatus = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const result = await owaspListService(req);

    res.status(201).json({
      message: "OWASP listesi başarıyla güncellendi",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "OWASP listesi güncellenirken bir hata oluştu",
      error: error.message,
    });
  }
};

export const getByNameOwasp = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const result = await getByNameOwaspService(req);

    res.status(200).json({
      message: "OWASP listesi başarıyla getirildi",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "OWASP listesi getirilirken bir hata oluştu",
      error: error.message,
    });
  }
};
