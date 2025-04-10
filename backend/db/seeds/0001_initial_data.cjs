
const pkg = require('pg');
const { Pool } = pkg;
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function seed() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Örnek zafiyetler
        await client.query(`
            INSERT INTO tbl_zaafiyetler (zaafiyet_adi, zaafiyet_aciklamasi)
            VALUES 
                ('SQL Injection', 'SQL sorgularına müdahale edilmesi'),
                ('XSS', 'Cross-Site Scripting saldırıları'),
                ('CSRF', 'Cross-Site Request Forgery saldırıları'),
                ('Broken Authentication', 'Zayıf kimlik doğrulama'),
                ('Security Misconfiguration', 'Güvenlik yapılandırma hataları')
        `);

        await client.query('COMMIT');
        console.log('Seeder verileri başarıyla eklendi.');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Seeder hatası:', error);
    } finally {
        client.release();
    }
}

seed().then(() => pool.end()); 