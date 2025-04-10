
import db from '../config/db.js';


const sqlInjectionService = {
    unSafeQuery: async (zaafiyetAdi) => {
        try {
            const sql = `SELECT * FROM tbl_zaafiyetler WHERE zaafiyet_adi = '${zaafiyetAdi}' `  
            const result = await db.query(sql);

            if(result && result.rows?.length > 0 ) {
                return result.rows
            } else {
                return [];
            }
         } catch (error) {
     
            console.log('sqlInjectionService.unSafeQuery: error', error)
            return [];
            
        }
    },
    safeQuery: async(zaafiyetAdi) => {

        try {
            const sql = 'SELECT * FROM tbl_zaafiyetler WHERE zaafiyet_adi = $1 '
            const result = await db.query(sql, [zaafiyetAdi])

            if(result && result.rows?.length > 0) {
                return result.rows
            } else {
                return [];
            }
            

        } catch (error) {
            console.log('sqlInjectionService.safeQuery: error', error)
            return [];
            
        }
    }
}

export default sqlInjectionService;