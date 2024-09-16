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

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));

const requireLogin = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

const requireAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') {
    next();
  } else {
    res.status(403).send('Dostęp zabroniony');
  }
};

const guestsList = [
  { name: 'Panna', password: 'Młoda', role: 'admin' },
  { name: 'Pan', password: 'Młody', role: 'admin' },
  { name: 'Jan', password: 'Kowalski', role: 'user' }
];

let photoData = [];

app.get('/', (req, res) => {
  res.render('index', { user: req.session.user });
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { name, password } = req.body;
  const ultraSecretExclusivePerson = guestsList
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

    const filesWithUser = files.map(file => {
      const photoInfo = photoData.find(photo => photo.filename === file);
      return { filename: file, user: photoInfo ? photoInfo.user : 'Unknown' };
    });
    res.render('gallery', { files: filesWithUser, user: req.session.user });
  });
});

app.post('/upload', requireLogin, upload.single('photo'), (req, res) => {
  let photoName = req.session.user.name + ' ' + req.session.user.password;
  photoData.push({ filename: req.file.filename, user: photoName });
  res.redirect('/gallery');
});

app.post('/delete', requireLogin, requireAdmin, (req, res) => {
  const { filename } = req.body;
  const filePath = path.join(__dirname, 'public/img/uploads', filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Błąd usuwania pliku:', err);
      return res.status(500).send('Błąd usuwania pliku');
    }
    photoData = photoData.filter(photo => photo.filename !== filename);
    res.redirect('/gallery');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
