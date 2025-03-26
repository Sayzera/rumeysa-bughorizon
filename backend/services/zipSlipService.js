import path from "path";
import { fileURLToPath } from "url";
import pool from "../config/db.js";
import AdmZip from "adm-zip";
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * zipSlipService fonksiyonu, bir HTTP isteğinden gelen form verilerini ve dosyayı işleyerek,
 * dosyayı belirtilen bir dizine kaydeder ve veritabanına bir kayıt ekler.
 *
 * @param {Object} req - Express.js HTTP isteği nesnesi.
 * @param {Object} req.body - İstek gövdesi, form verilerini içerir.
 * @param {string} req.body.name - Form verisindeki isim alanı.
 * @param {string} req.body.address - Form verisindeki adres alanı.
 * @param {Object} req.files - İstek dosyaları nesnesi.
 * @param {Object} req.files.file - Yüklenen dosya nesnesi.
 * @param {Object} req.user - İstekten gelen kullanıcı nesnesi.
 * @param {number} req.user.id - Kullanıcı ID'si.
 *
 * @throws {Error} - Hata oluşursa bir hata fırlatır.
 *
 * @returns {Promise<void>} - Bu fonksiyon bir değer döndürmez.
 */
export const zipSlipService = async (req) => {
  try {
    const { name, address } = req.body;
    const file = req.files.file;

    const uploadPath = path.join(
      __dirname,
      "..",
      "uploads/zip-slip/",
      file.name
    );

    await file.mv(uploadPath);
    const userId = req.user.id;

    const zipSlipStatus =
      await pool.query("SELECT * FROM tbl_owasp_list where name = $1", [
        "zip-slip",
      ]);

    if (zipSlipStatus.rows.length === 0) {
      throw new Error("zip-slip listesi bulunamadı.");
    }


    const zipSlipStatusData = zipSlipStatus.rows[0].status;


    let outputDir = "";


    if (!zipSlipStatusData) {
      outputDir = path.join(__dirname, "..", "./");
    } else {
      outputDir = path.join(__dirname, "..", "uploads/zip-slip/extracted/");

      if(!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
    }

    const zip = new AdmZip(uploadPath);

    zip.extractAllTo(outputDir, true); // true parametresi ile her şeyi çıkar
    console.log("ZIP dosyası başarıyla çıkarıldı.");

    await pool.query(
      "INSERT INTO tbl_zip_slip (name, address, user_id, file) VALUES ($1, $2, $3, $4)",
      [name, address, userId, file.name]
    );
  } catch (error) {
    console.error("[zipSlipService]:", error);
    throw new Error("[zipSlipService]:" + error.message);
  }
};
