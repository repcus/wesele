const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const upload = multer({ dest: 'public/img/uploads' });

// Ustawienie silnika widoku EJS
app.set('view engine', 'ejs');

// Ścieżka do plików statycznych (np. CSS, obrazy)
app.use(express.static('public'));

// Konfiguracja sesji
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));

// Parsowanie danych z formularzy
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware sprawdzający, czy użytkownik jest zalogowany
const requireLogin = (req, res, next) => {
  if (req.session.user) {
    // Jeśli użytkownik jest zalogowany, przejdź do kolejnej funkcji pośredniej lub obsługi żądania
    next();
  } else {
    // Jeśli użytkownik nie jest zalogowany, przekieruj na stronę logowania
    res.redirect('/login');
  }
};

// Lista gości (dla celów demonstracyjnych)
const guests = [
  { name: 'Jan Kowalski', password: 'haslo1' },
  { name: 'Anna Nowak', password: 'haslo2' },
  { name: 'a', password: 'a' }
];

app.get('/', (req, res) => {
  res.render('index', { user: req.session.user });
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { name, password } = req.body;
  const guest = guests.find(guest => guest.name === name && guest.password === password);
  if (guest) {
    req.session.user = guest;
    res.redirect('/gallery');
  } else {
    res.send('Błędne dane logowania.');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
});

app.get('/upload', requireLogin, (req, res) => {
  res.render('upload', { user: req.session.user });
});

app.get('/gallery', requireLogin, (req, res) => {
  const directoryPath = path.join(__dirname, 'public/img/uploads');
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Błąd odczytu plików:', err);
      return res.status(500).send('Błąd odczytu plików');
    }
    // Przekazanie listy plików do widoku gallery
    res.render('gallery', { files, user: req.session.user });
  });
});


// Dodaj obsługę przesyłanych plików na nowej trasie /upload
app.post('/upload', requireLogin, upload.single('photo'), (req, res) => {
  res.redirect('/gallery');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
