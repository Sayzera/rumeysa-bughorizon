const sqlInjectionService = require('../services/sqlInjectionService');

const sqlInjectionController = {
    // Güvenli olmayan sorgu - SQL Injection'a açık
    unsafeQuery: async (req, res) => {
        try {
            const { query } = req.body;
            const result = await sqlInjectionService.unsafeQuery(query);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Güvenli sorgu - SQL Injection'a kapalı
    safeQuery: async (req, res) => {
        try {
            const { query } = req.body;
            const result = await sqlInjectionService.safeQuery(query);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Zafiyet durumuna göre sorgu çalıştırma
    executeQuery: async (req, res) => {
        try {
            const { query, isVulnerable } = req.body;
            let result;
            
            if (isVulnerable) {
                result = await sqlInjectionService.unsafeQuery(query);
            } else {
                result = await sqlInjectionService.safeQuery(query);
            }
            
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = sqlInjectionController; 