import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import pool from './config/db.js'

import authRoutes from './routes/authRoutes.js'
import sqlInjectionRoutes from './routes/sqlInjectionRoutes.js'
import sqlTableRoutes from './routes/sqlTableRoutes.js'

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// CORS configuration
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ["Content-Type"],
}

app.use(cors(corsOptions));


app.use('/api/auth', authRoutes)
app.use('/api/sql-injection',sqlInjectionRoutes )
app.use('/api/sql-table', sqlTableRoutes)


app.get('/', (req, res) => {
    res.json({
        message: 'Bug Horizon projesine hoş geldiniz.',
    })
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})