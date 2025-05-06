import pool from "../config/db.js"


export const logService = async (content, type) => {
            // log kaydını oluştur 
            const logContent = content
            const logType = type || 'info'
    
            await pool.query(
                `INSERT INTO tbl_logs (log_content, log_type) VALUES ($1, $2)`,
                [logContent, logType]
            )
            
}