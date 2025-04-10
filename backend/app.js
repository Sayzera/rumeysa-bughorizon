import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";
import authRoutes from './routes/authRouter.js';
import zipSlipRoutes from './routes/zipSlipRouter.js';
import owaspRoutes from './routes/owaspRouter.js';
dotenv.config();

import authRoutes from './routes/authRoutes.js'
const sqlInjectionRoutes = require('./routes/sqlInjectionRoutes');

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
const corsOpts = {
  origin: "*",

  methods: ["GET", "POST"],

  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));

app.use('/api/auth', authRoutes);
app.use('/api/zip-slip', zipSlipRoutes);
app.use('/api/owasp', owaspRoutes);


// CORS configuration
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ["Content-Type"],
}

app.use(cors(corsOptions));


app.use('/api/auth', authRoutes)
app.use('/api/sql-injection', sqlInjectionRoutes);


app.get('/', (req, res) => {
    res.json({
        message: 'Bug Horizon projesine hoş geldiniz.',
    })
})


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
