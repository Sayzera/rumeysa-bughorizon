import sqlTableService from "../services/sqlTableService.js";

const sqlTableController = {
    createInjection: async (req, res) => {
    try {
      const { zaafiyet_adi,zaafiyet_aciklamasi } = req.body;

      const result = await sqlTableService.createInjection(zaafiyet_adi,zaafiyet_aciklamasi);

      res.json({
        message: result.message,
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

export default sqlTableController;
