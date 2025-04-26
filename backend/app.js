import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import pool from './config/db.js'

import authRoutes from './routes/authRoutes.js'
import sqlInjectionRoutes from './routes/sqlInjectionRoutes.js'
import sqlTableRoutes from './routes/sqlTableRoutes.js'
import csrfRoutes from './routes/csrfRoutes.js'
import missconfigrationRoutes from './routes/checkMissconfigrationRoutes.js'
import CookieParse from 'cookie-parser'
dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-csrf-token', 'Authorization', 'Cookie'],
    exposedHeaders: ['x-csrf-token', 'Set-Cookie'],
    credentials: true,
    maxAge: 86400 // 24 saat
};
app.use(express.json());
app.use(CookieParse())


// Middleware sırasını değiştir
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/api/auth', authRoutes)
app.use('/api/sql-injection',sqlInjectionRoutes )
app.use('/api/sql-table', sqlTableRoutes)
app.use('/api/csrf', csrfRoutes)
app.use('/api/missconfigration', missconfigrationRoutes)

app.get('/', (req, res) => {
    res.json({
        message: 'Bug Horizon projesine hoş geldiniz.',
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})