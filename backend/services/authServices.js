import pool from "../config/db.js"
import { logService } from "./logSerivces.js"


export const registerUser = async (username, password, email) => {
    try {
     
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

        await logService(`Kullanıcı ${username} kayıt oldu.`, 'register')

        return createdUser.rows[0]
        
    } catch (error) {
        console.log('[authServices/registerUser] error: ', error.message)
        throw new Error('Kullanıcı kaydı sırasında bir hata oluştu.')
    }
}


export const loginUser = async (username, password) => {
    try {
        
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



        await logService(`Kullanıcı ${username} giriş yaptı.`, 'login')

        return user.rows[0]
      
        
    } catch (error) {
        console.log('[authServices/loginUser] error: ', error.message)
        throw new Error('Kullanıcı girişi sırasında bir hata oluştu.')
    }
}