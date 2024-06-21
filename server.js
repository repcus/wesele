const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const upload = multer({ dest: 'public/img/uploads' });

app.set('view engine', 'ejs');

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
    next();
  } else {
    res.redirect('/login');
  }
};

// Middleware sprawdzający, czy użytkownik jest administratorem
const requireAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') {
    next();
  } else {
    res.status(403).send('Dostęp zabroniony');
  }
};

const ultraSecretExclusiveList = [
  { name: 'AniaKacper', password: 'okoń', role: 'admin' },
  { name: 'Beata', password: 'Kowalska', role: 'user' },
  { name: 'Krzysztof', password: 'Kowalski', role: 'user' },
  { name: 'Zenona', password: 'Magielska', role: 'user' },
  { name: 'Jerzy', password: 'Magielski', role: 'user' },
  { name: 'Jacek', password: 'Magielski', role: 'user' },
  { name: 'Anna', password: 'Korowajska', role: 'user' },
  { name: 'Monika', password: 'Plewa', role: 'user' },
  { name: 'Rafał', password: 'Kołodkiewicz', role: 'user' },
  { name: 'Alicja', password: 'Płóciennik', role: 'user' },
  { name: 'Dobrosław', password: 'Płóciennik', role: 'user' },
  { name: 'Robert', password: 'Kaźmierski', role: 'user' },
  { name: 'Magdalena', password: 'Kaźmierska', role: 'user' },
  { name: 'Renata', password: 'Paturaj', role: 'user' },
  { name: 'Michał', password: 'Kubiak', role: 'user' },
  { name: 'Aleksandra', password: 'Kowalik', role: 'user' },
  { name: 'Violetta', password: 'Szczepanik', role: 'user' },
  { name: 'Krzysztof', password: 'Szczepanik', role: 'user' },
  { name: 'Piotr', password: 'Łoszewski', role: 'user' },
  { name: 'Ewa', password: 'Jędrzejczak', role: 'user' },
  { name: 'Jakub', password: 'Łoszewski', role: 'user' },
  { name: 'Anita', password: 'Kaźmierska', role: 'user' },
  { name: 'Paweł', password: 'Dzięcielewski', role: 'user' },
  { name: 'Łukasz', password: 'Szczepanik', role: 'user' },
  { name: 'Natalia', password: 'Szczepanik', role: 'user' },
  { name: 'Wiktoria', password: 'Paturaj', role: 'user' },
  { name: 'Kazimierz', password: 'Samson', role: 'user' },
  { name: 'Krystyna', password: 'Samson', role: 'user' },
  { name: 'Monika', password: 'Samson-Lorenc', role: 'user' },
  { name: 'Maciej', password: 'Lorenc', role: 'user' },
  { name: 'Edyta', password: 'Samson', role: 'user' },
  { name: 'Piotr', password: 'Plewa', role: 'user' },
  { name: 'Anna', password: 'Kornacka', role: 'user' },
  { name: 'Jacek', password: 'Kornacki', role: 'user' },
  { name: 'Juliusz', password: 'Kornacki', role: 'user' },
  { name: 'Wiktoria', password: 'Okrój', role: 'user' },
  { name: 'Zofia', password: 'Kornacka', role: 'user' },
  { name: 'Aleksander', password: 'Kornacki', role: 'user' },
  { name: 'Zdzisława', password: 'Kasprzak', role: 'user' },
  { name: 'Zenon', password: 'Kasprzak', role: 'user' },
  { name: 'Aleksandra', password: 'Kornacka', role: 'user' },
  { name: 'Piotr', password: 'Błażejewski', role: 'user' },
  { name: 'Zuzanna', password: 'Błażejewska', role: 'user' },
  { name: 'Robert', password: 'Kasprzak', role: 'user' },
  { name: 'Iwona', password: 'Kasprzak', role: 'user' },
  { name: 'Aleksandra', password: 'Kasprzak', role: 'user' },
  { name: 'Natalia', password: 'Kasprzak', role: 'user' },
  { name: 'Aleksander', password: 'Kasprzak', role: 'user' },
  { name: 'Magdalena', password: 'Gólczyńska', role: 'user' },
  { name: 'Błażej', password: 'Gólczyński', role: 'user' },
  { name: 'Bartosz', password: 'Gólczyński', role: 'user' },
  { name: 'Paweł', password: 'Gólczyński', role: 'user' },
  { name: 'Marcin', password: 'Wojton', role: 'user' },
  { name: 'Gabriela', password: 'Jarecka', role: 'user' },
  { name: 'Adrian', password: 'Kolasiński', role: 'user' },
  { name: 'Cezary', password: 'Sysiak', role: 'user' },
  { name: 'Zuzanna', password: 'Kłos', role: 'user' },
  { name: 'Patryk', password: 'Lefik', role: 'user' },
  { name: 'Edyta', password: 'Dróżdż', role: 'user' },
  { name: 'Karolina', password: 'Kalinowska', role: 'user' },
  { name: 'Mateusz', password: 'Strzelczuk', role: 'user' },
  { name: 'Katarzyna', password: 'Gładkiewicz', role: 'user' },
  { name: 'Kamil', password: 'Mąkoszewski', role: 'user' },
  { name: 'Piotr', password: 'Kowalczyk', role: 'user' },
  { name: 'Jakub', password: 'Rzeźnicki', role: 'user' },
  { name: 'Agata', password: 'Kasperska', role: 'user' },
  { name: 'Alicja', password: 'Plewa', role: 'user' },
  { name: 'Mateusz', password: 'Tomaszkiewicz', role: 'user' },
  { name: 'Bartosz', password: 'Nowak', role: 'user' },
  { name: 'Katarzyna', password: 'Duda', role: 'user' },
  { name: 'Bartosz', password: 'Synowiec', role: 'user' }
];

// Struktura do przechowywania informacji o zdjęciach i użytkownikach
let photoData = [];

app.get('/', (req, res) => {
  res.render('index', { user: req.session.user });
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { name, password } = req.body;
  const ultraSecretExclusivePerson = ultraSecretExclusiveList
    .find(ultraSecretExclusivePerson => ultraSecretExclusivePerson.name === name
      && ultraSecretExclusivePerson.password === password);
  if (ultraSecretExclusivePerson) {
    req.session.user = ultraSecretExclusivePerson;
    res.redirect('/gallery');
  } else {
    res.send("Błędne dane do logowania!<br><a href=\"./login\">Spróbuj ponownie</a>");
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
    // Przekazanie listy plików do widoku gallery z dodatkowymi danymi o zdjęciach

    const filesWithUser = files.map(file => {
      const photoInfo = photoData.find(photo => photo.filename === file);
      return { filename: file, user: photoInfo ? photoInfo.user : 'Unknown' };
    });
    res.render('gallery', { files: filesWithUser, user: req.session.user });
  });
});

// Dodaj obsługę przesyłanych plików na nowej trasie /upload
app.post('/upload', requireLogin, upload.single('photo'), (req, res) => {
  // Dodajemy informacje o zdjęciu i użytkowniku do photoData
  photoData.push({ filename: req.file.filename, user: req.session.user.name });
  res.redirect('/gallery');
});

// Trasa do usuwania zdjęć, dostępna tylko dla administratora
app.post('/delete', requireLogin, requireAdmin, (req, res) => {
  const { filename } = req.body;
  const filePath = path.join(__dirname, 'public/img/uploads', filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Błąd usuwania pliku:', err);
      return res.status(500).send('Błąd usuwania pliku');
    }
    // Usuwamy informacje o zdjęciu z photoData
    photoData = photoData.filter(photo => photo.filename !== filename);
    res.redirect('/gallery');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
