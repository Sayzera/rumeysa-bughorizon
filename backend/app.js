import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import pool from './config/db.js'

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


app.get('/', (req, res) => {
    res.json({
        message: 'Bug Horizon projesine hoş geldiniz.',
    })
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})