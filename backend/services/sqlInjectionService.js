const db = require('../config/database');

const sqlInjectionService = {
    // Güvenli olmayan sorgu - SQL Injection'a açık
    unsafeQuery: async (query) => {
        try {
            // Kullanıcıdan gelen parametreyi doğrudan sorguya ekle
            const sql = `SELECT * FROM tbl_zaafiyetler WHERE zafiyet_adi = '${query}'`;
            console.log('Çalıştırılan SQL Sorgusu:', sql); // Hata ayıklama için
            const [rows] = await db.query(sql);
            return rows;
        } catch (error) {
            throw new Error(`SQL Injection hatası: ${error.message}`);
        }
    },

    // Güvenli sorgu - SQL Injection'a kapalı
    safeQuery: async (query) => {
        try {
            // Parametreli sorgu kullanarak güvenli sorgu oluşturma
            const sql = 'SELECT * FROM tbl_zaafiyetler WHERE zafiyet_adi = ?';
            const [rows] = await db.query(sql, [query]);
            return rows;
        } catch (error) {
            throw new Error(`Güvenli sorgu hatası: ${error.message}`);
        }
    },

    // Tüm zafiyetleri getir
    getAllVulnerabilities: async () => {
        try {
            const sql = 'SELECT * FROM tbl_zaafiyetler';
            const [rows] = await db.query(sql);
            return rows;
        } catch (error) {
            throw new Error(`Veri getirme hatası: ${error.message}`);
        }
    },

    // Zafiyet adına göre arama
    searchByVulnerabilityName: async (name) => {
        try {
            const sql = 'SELECT * FROM tbl_zaafiyetler WHERE zafiyet_adi LIKE ?';
            const [rows] = await db.query(sql, [`%${name}%`]);
            return rows;
        } catch (error) {
            throw new Error(`Arama hatası: ${error.message}`);
        }
    }
};

module.exports = sqlInjectionService; 