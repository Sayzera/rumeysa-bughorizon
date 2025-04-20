import dotenv from 'dotenv'

dotenv.config();

export const getMissConfigration = async (isSecurityMissconfigration,newConfigrationName) => {

    try {
        return  {
            ... isSecurityMissconfigration ?{
                database_url:  process.env.DATABASE_URL,
                port:  process.env.PORT,
                APIKEY:  process.env.APIKEY,
                debugMode:  process.env.debugMode,
            } : {},

            // Eklediği kayıt bilgisi dönüyor
            newConfigrationName:newConfigrationName,
            created_at: new Date().toLocaleDateString(),
            updated_at: new Date().toLocaleDateString(),
            user_id:1,
           
        }
        
    } catch (error) {
        console.log('[getMissConfigration]: ', error)
       return null;
    }

}