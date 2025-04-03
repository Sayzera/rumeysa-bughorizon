import { loginUser, registerUser } from "../services/authServices.js";


export const login = async (req,res) => {
    try {
        const { username, password } = req.body;
        const loginData = await loginUser(username, password);

        res.status(201).json({
            data: loginData,
            message: 'Kullanıcı başarıyla giriş yaptı.',
            success: 200
        })
        
    } catch (error) {
        console.log('[authController/login] error: ', error.message)
        res.status(400).json({
            message:error.message,
            success: 400,
            data: null
        })
    }
}

export const register = async (req, res) => {
     try {
        const { username, password, email } = req.body;
        const resRegisterUser = await registerUser(username, password, email);

        res.status(201).json({
            data: resRegisterUser,
            message: 'Kullanıcı başarıyla kaydedildi.',
            success: 200
        })
        
     } catch (error) {
        console.log('[authController/register] error: ', error.message)
        res.status(400).json({
            message:error.message,
            success: 400,
            data: null
        })
     }
}