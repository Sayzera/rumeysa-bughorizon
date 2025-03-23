import dotenv from 'dotenv'

dotenv.config()

const jwtConfig = {
    jwtSecret: process.env.JWT_SECRET_KEY,
    jwtExpiration: 1 * 24 * 60 * 60 // 1 day
}

export {
    jwtConfig
}