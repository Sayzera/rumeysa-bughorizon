const express = require('express');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');

const app = express();
const port = 3001;

app.use(cookieParser());
app.use(express.urlencoded({ extended: false })); // Form verilerini işlemek için
app.use(express.json()); // JSON verilerini işlemek için

// CSRF tokeni oluşturma fonksiyonu
const generateCsrfToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

// CSRF koruması middleware'i
const csrfProtection = (req, res, next) => {
    const csrfTokenFromCookie = req.cookies['csrfToken'];
    const csrfTokenFromRequest = req.body._csrf || req.headers['x-csrf-token'];

    if (!csrfTokenFromCookie || !csrfTokenFromRequest || csrfTokenFromCookie !== csrfTokenFromRequest) {
        return res.status(403).send('CSRF token geçersiz.');
    }
    next();
};

// İlk istekte CSRF tokeni oluştur ve çerezde gönder
app.get('/api/csrf', (req, res) => {
    const token = generateCsrfToken();
    res.cookie('csrfToken', token, { httpOnly: true, sameSite: 'strict' }); // httpOnly: JavaScript'in erişimini engeller, sameSite: siteler arası isteklerde gönderilmesini kısıtlar
    res.json({ csrfToken: token }); // İsteğe bağlı olarak istemciye de gönderebilirsiniz (ancak çerez daha güvenlidir)
});

// Güvenli bir işlem örneği (POST isteği)
app.post('/api/secure-action', csrfProtection, (req, res) => {
    res.json({ message: 'Güvenli işlem başarıyla gerçekleştirildi.' });
});

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor.`);
});



import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [message, setMessage] = useState('');
    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        // Backend'den CSRF tokenini al (çerez otomatik olarak tarayıcı tarafından gönderilir)
        axios.get('/api/csrf')
            .then(response => {
                // İsteğe bağlı olarak backend'den gelen tokeni state'e kaydedebilirsiniz
                setCsrfToken(response.data.csrfToken);
            })
            .catch(error => {
                console.error('CSRF token alınırken hata oluştu:', error);
            });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/secure-action', {
                data: 'Gönderilen veri',
                _csrf: getCsrfTokenFromCookie() // Çerezden tokeni al
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Güvenli işlem başarısız oldu.');
            console.error('Hata:', error);
        }
    };

    // Çerezden CSRF tokenini okuma fonksiyonu
    const getCsrfTokenFromCookie = () => {
        const name = 'csrfToken=';
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    };

    const handleSecureActionWithHeader = async () => {
        try {
            const token = getCsrfTokenFromCookie();
            const response = await axios.post(
                '/api/secure-action',
                { data: 'Başlık ile gönderilen veri' },
                { headers: { 'X-CSRF-Token': token } }
            );
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Güvenli işlem (başlık) başarısız oldu.');
            console.error('Hata:', error);
        }
    };

    return (
        <div>
            <h1>CSRF Koruması Örneği</h1>
            <p>{message}</p>

            <h2>Form Gönderimi ile CSRF</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="data">Veri:</label>
                    <input type="text" id="data" name="data" />
                </div>
                {/* CSRF tokenini gizli bir input alanı olarak ekle */}
                <input type="hidden" name="_csrf" value={getCsrfTokenFromCookie()} />
                <button type="submit">Güvenli İşlem Yap (Form)</button>
            </form>

            <h2>Başlık ile CSRF</h2>
            <button onClick={handleSecureActionWithHeader}>Güvenli İşlem Yap (Başlık)</button>
        </div>
    );
}

export default App;