docker-compose up -d --build dockerı çalıştırıyorsun
docker-compose down -v kapatma ve tüm verileri temizleme 

- backend işlemlerinde değişikliklerin otomatik olarak gözükmesi için gereklidir 
npm install -g nodemon 

-- npx node-pg-migrate create init --dir=db/migrations // migration oluşturma 
-- npx node-pg-migrate up --dir=db/migrations // migrationı çalıştırma
