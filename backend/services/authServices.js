import pool from "../config/db.js"


export const registerUser = async (username, password, email) => {
    try {
     
        //TODO: Bir kullanıcı daha önceden kayıt olmuş ise bu kaydı kontrol et ve hata olarak geri döndür
        const tableName = 'tbl_users'
        const user=await pool.query(
            `SELECT * FROM ${tableName} WHERE username=$1 AND password=$2`,
            [username,password]
        )
        if(user.rowCount>0){
            throw new Error('Bu kullanıcı adı veya e-posta adresi zaten kullanılıyor.')
        }

        const createdUser = await pool.query(
            `INSERT INTO ${tableName} (username, password, email) VALUES ($1, $2, $3)`, 
            [username, password, email]
        )

        return createdUser.rows[0]
        
    } catch (error) {
        console.log('[authServices/registerUser] error: ', error.message)
        throw new Error('Kullanıcı kaydı sırasında bir hata oluştu.')
    }
}


export const loginUser = async (username, password) => {
    try {

        // TODO: Eğer username db de yoksa hata olarak döndür 
        
        const tableName = 'tbl_users'

        const userControl=await pool.query(
            `SELECT username FROM ${tableName} WHERE username=$1`,
            [username]
        )
        
        if (userControl.rowCount===0) {
            throw new Error('Böyle bir kullanıcı adı bulunmamaktadır.')
        }

        const user = await pool.query(
            `SELECT * FROM ${tableName} WHERE username = $1 AND password = $2`,
         [username, password]
        )


        if(user.rowCount === 0) {
            throw new Error('Kullanıcı adı veya şifre hatalı.')
        }

        return user.rows[0]
      
        
    } catch (error) {
        console.log('[authServices/loginUser] error: ', error.message)
        throw new Error('Kullanıcı girişi sırasında bir hata oluştu.')
    }
}