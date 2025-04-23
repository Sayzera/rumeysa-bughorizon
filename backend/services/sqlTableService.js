
import db from '../config/db.js';


const sqlTableService = {
    createInjection: async (zaafiyetAdi,zaafiyetAciklamasi) => {
        try {
            const sql = `INSERT INTO tbl_zaafiyetler (zaafiyet_adi, zaafiyet_aciklamasi) VALUES ('${zaafiyetAdi}', '${zaafiyetAciklamasi}')`;  
            const result = await db.query(sql);
            
            if(result.rowCount > 0 ) {
                return {
                    message: 'Veri başarıyla eklendi',
                    success: 200
                };
            } else {
                return [];
            }
         } catch (error) {
     
            console.log('sqlTableService.createInjection: error', error)
            return [];
            
        }
    },
    listInjection: async () => {
        try {
            const sql = "SELECT * FROM tbl_zaafiyetler";  
            const result = await db.query(sql);
            
            if(result.rowCount > 0 ) {
                return result.rows;
            } else {
                return [];
            }
         } catch (error) {
     
            console.log('sqlTableService.listInjection: error', error)
            return [];
            
        }
    },
    deleteInjection: async (id) => {
        try {
            const sql = `DELETE FROM tbl_zaafiyetler WHERE id = ${id}`;  
            const result = await db.query(sql);
            if (result.rowCount > 0) {
                return {
                    message: 'Veri başarıyla silindi',
                    success: true
                };
            } else {
                return {
                    message: 'Silinecek veri bulunamadı',
                    success: false
                };
            }
            
         } catch (error) {
     
            console.log('sqlTableService.createInjection: error', error)
            return [];
            
        }
    },

}

export default sqlTableService;