import { getSSRF } from "../services/ssrfService.js";

export const ssrfControl = async (req, res) => {
  try {
    const { isSSRF, url } = req.body;

    const response = await getSSRF(isSSRF, url);

    if (!response) {
      return res.status(400).json({
        message: "SSRF kontrolü başarısız oldu",
        success: 400,
        data: null,
      });
    } else {
      res.status(201).json({
        data: response,
        message: "Bilgiler başarıyla getirildi",
        success: 200,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: 400,
      data: null,
    });
  }
};
