import sqlInjectionService from "../services/sqlInjectionService.js";

const sqlInjectionController = {
  unsafeQuery: async (req, res) => {
    try {
      const { zaafiyet_adi } = req.body;

      const result = await sqlInjectionService.unSafeQuery(zaafiyet_adi);

      res.json({
        message: "Veriler başarılı bir şekilde geldi",
        data: result,
        success: 200,
      });
    } catch (error) {
      res.json({
        message: "Bilinmeyen bir hata oluştu",
        data: [],
        success: 500,
      });
    }
  },
  safeQuery: async (req, res) => {
    try {
      const { zaafiyet_adi } = req.body;

      const result = await sqlInjectionService.safeQuery(zaafiyet_adi);

      res.json({
        message: "Veriler başarılı bir şekilde geldi",
        data: result,
        success: 200,
      });
    } catch (error) {
      res.json({
        message: "Bilinmeyen bir hata oluştu",
        data: [],
        success: 500,
      });
    }
  },
};

export default sqlInjectionController;
