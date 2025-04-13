
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
     
            console.log('sqlTableService.unSafeQuery: error', error)
            return [];
            
        }
    }
}

export default sqlTableService;