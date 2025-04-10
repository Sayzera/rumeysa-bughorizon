const { Pool } = require('pg');
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

async function seed() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Örnek kullanıcılar
        await client.query(`
            INSERT INTO tbl_users (username, password, email, age, status)
            VALUES 
                ('admin', '$2b$10$XKXKXKXKXKXKXKXKXKXKXK', 'admin@example.com', 30, true),
                ('user1', '$2b$10$XKXKXKXKXKXKXKXKXKXKXK', 'user1@example.com', 25, true),
                ('user2', '$2b$10$XKXKXKXKXKXKXKXKXKXKXK', 'user2@example.com', 28, true)
        `);

        // Örnek zafiyetler
        await client.query(`
            INSERT INTO tbl_zaafiyetler (zafiyet_adi, aciklama, risk_seviyesi, status)
            VALUES 
                ('SQL Injection', 'SQL sorgularına müdahale edilmesi', 'Yüksek', true),
                ('XSS', 'Cross-Site Scripting saldırıları', 'Yüksek', true),
                ('CSRF', 'Cross-Site Request Forgery saldırıları', 'Orta', true),
                ('Broken Authentication', 'Zayıf kimlik doğrulama', 'Yüksek', true),
                ('Security Misconfiguration', 'Güvenlik yapılandırma hataları', 'Orta', true)
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