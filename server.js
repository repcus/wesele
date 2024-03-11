const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const app = express();
const upload = multer({ dest: 'public/img/uploads' });

// Ustawienie silnika widoku EJS
app.set('view engine', 'ejs');

// Ścieżka do plików statycznych (np. CSS, obrazy)
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/upload', (req, res) => {
  res.render('upload');
});

app.get('/gallery', (req, res) => {
  const directoryPath = path.join(__dirname, 'public/img/uploads');

  // Odczytaj listę plików z folderu img
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Błąd odczytu plików:', err);
      return res.status(500).send('Błąd odczytu plików');
    }

    // Przekazanie listy plików do widoku gallery
    res.render('gallery', { files });
  });
});

// Dodaj obsługę przesyłanych plików na nowej trasie /upload
app.post('/upload', upload.single('photo'), (req, res) => {
  res.redirect('/upload');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});