import {
    getMissConfigration
} from '../services/missconfigrationService.js'

export const checkMissConfigration = async (req,res) => {
    try {
        const {
            isSecurityMissconfigration,
            newConfigrationName
        } = req.body;

       const response =  await getMissConfigration(isSecurityMissconfigration,newConfigrationName)

        
       res.status(201).json({
        data: response,
        message: 'Bilgiler başarıyla getirildi',
        success:200
       })

        
    } catch (error) {
        res.status(400).json({
            message: error.message,
            success:400,
            data:null
        })
    }
}