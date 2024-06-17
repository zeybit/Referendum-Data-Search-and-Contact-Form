const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const dotenv = require('dotenv');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

// dotenv ile .env dosyasındaki çevresel değişkenleri yükle
dotenv.config();

// MySQL bağlantısı
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('MySQL bağlantı hatası:', err);
        return;
    }
    console.log('MySQL bağlantısı başarılı');
});

// Express için body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

// Verileri tutacak global değişken
let veriler = [];

// Uygulama başlatıldığında verileri yükle
fs.readFile(path.join(__dirname, 'data', 'data.json'), 'utf8', (err, data) => {
    if (err) {
        console.error('Veri okuma hatası:', err);
        return;
    }
    veriler = JSON.parse(data);
});

// Ana sayfa route'u
app.get('/', (req, res) => {
    res.render('index', { veriler });
});

// İletişim formu route'u
app.get('/iletisim', (req, res) => {
    res.render('iletisim');
});

// Filtreleme endpoint'i
app.get('/filtrele', (req, res) => {
    const query = req.query.q || ''; // Kullanıcının aradığı metin
    const filteredVeriler = veriler.filter(item => {
        // Sadece il alanında arama yapılır
        return item.il.toLocaleLowerCase('tr-TR').includes(query.toLocaleLowerCase('tr-TR'));
    });

    if (filteredVeriler.length === 0) {
        res.render('no-data-found'); // Eğer filtrelenmiş veri yoksa no-data-found.ejs sayfasını render et
    } else {
        res.render('index', { veriler: filteredVeriler });
    }
});

// İletişim formu POST route'u
app.post('/iletisim', (req, res) => {
    // Form verilerini al
    const { adSoyad, email, telefon, mesaj } = req.body;

    // Veritabanına kaydetme işlemi
    const query = 'INSERT INTO iletisim (ad_soyad, email, telefon, mesaj) VALUES (?, ?, ?, ?)';
    db.query(query, [adSoyad, email, telefon, mesaj], (err, result) => {
        if (err) {
            console.error('Veritabanına kaydetme hatası:', err);
            res.status(500).send('Veritabanına kaydetme hatası');
            return;
        }
        console.log('Veri başarıyla kaydedildi:', result.insertId);
        res.send('İletişim formu başarıyla gönderildi.');
    });
});

// Sunucuyu dinleme
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda başlatıldı.`);
});
