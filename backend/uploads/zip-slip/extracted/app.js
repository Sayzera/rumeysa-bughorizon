 
import express from "express";
import dotenv from "dotenv";

dotenv.config();

// MongoDB'ye bağlan

const app = express();
const PORT = process.env.PORT || 3000;



app.get("/", (req, res) => {
  res.json({
    message: `
     Hacklendin
    `,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

