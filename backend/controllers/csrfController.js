import { generateCsrfToken } from "../utils/crsf.js"


const CSRFController = {
    generateCsrf :(req,res) => {
         const token = generateCsrfToken()
         
         res.cookie('csrfToken', token, {
            httpOnly: true,
            secure: false, // PRODUCTION'DA HTTPS VARSA true YAPIN!
            sameSite: 'Lax', // Cross-origin ise ve HTTPS varsa 'None' deneyin
            path: '/',
            maxAge: 1 * 60 * 60 * 1000 // Örnek: 1 saat geçerlilik süresi
        });


         res.json({
            csrfToken: token
         })
    },
    secureAction : (req,res) => {
        res.json({
            message: 'Güvenli işlem başarıyla gerçekleştirildi'
        })
    },
    notSecureAction : (req,res) => {
        res.json({
            message: 'İşem gerçekleşti fakat güvenli değil'
        })
    }
 }


 export default CSRFController