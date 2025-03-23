import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from './routes/authRouter.js';

dotenv.config();

// MongoDB'ye bağlan

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOpts = {
  origin: "*",

  methods: ["GET", "POST"],

  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));

app.use('/api/auth', authRoutes);


app.get("/", (req, res) => {
  res.json({
    message: `
     Bug horizion projesine hoş geldiniz.
    `,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
