
import pg from 'pg';
import dotenv from 'dotenv'
const { Pool } = pg; 

dotenv.config();

if(!process.env.DATABASE_URL) {
    throw new Error('Database url env dosyasında bulunamadı!');
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

pool.on('connect', () => {
    console.log('PostgreSQL veritabanına bağlandı.');
})


export default pool;