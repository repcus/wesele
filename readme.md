
## Dokumentacja Projektu

### Opis Projektu
Projekt jest aplikacją webową napisaną w Node.js z wykorzystaniem frameworka Express.
Celem aplikacji jest umożliwienie zarządzania galerią zdjęć wykonywanych podczas wydarzenia. Użytkownicy mogą się logować, przeglądać galerię, a także przesyłać zdjęcia. Istnieje również rola administratora, który ma dodatkowe uprawnienia, takie jak usuwanie zdjęć.

Kod źródłowy projektu znajduje się na serwisie GitHub, a aplikacja jest hostowana w środowisku Render.

### Przypadki Użycia Aplikacji

#### 1. Rejestracja Użytkownika
**Opis:** Proces rejestracji nie jest bezpośrednio zaimplementowany w aplikacji. Zamiast tego użytkownicy są predefiniowani w zmiennej `guestsList` w pliku `server.js`.

#### 2. Logowanie Użytkownika
**Opis:** Użytkownik wprowadza swoje dane logowania na stronie logowania.

**Kroki:**
1. Użytkownik otwiera stronę logowania (`/login`).
2. Użytkownik wprowadza swoje imię i hasło.
3. Po zatwierdzeniu formularza, aplikacja weryfikuje dane w zmiennej `guestsList`.
4. Jeśli dane są poprawne, użytkownik jest przekierowywany do galerii zdjęć (`/gallery`).

**Rezultat:** Użytkownik zostaje zalogowany i może przeglądać, przesyłać oraz usuwać zdjęcia (jeśli jest administratorem).

#### 3. Przeglądanie Galerii Zdjęć
**Opis:** Zalogowany użytkownik może przeglądać zdjęcia w galerii.

**Kroki:**
1. Użytkownik otwiera stronę galerii (`/gallery`).
2. Aplikacja odczytuje listę zdjęć z katalogu `public/img/uploads`.
3. Zdjęcia są wyświetlane wraz z informacją o użytkowniku, który je przesłał.

**Rezultat:** Użytkownik widzi wszystkie przesłane zdjęcia oraz kto je dodał.

#### 4. Przesyłanie Nowego Zdjęcia
**Opis:** Zalogowany użytkownik może przesyłać nowe zdjęcia do galerii.

**Kroki:**
1. Użytkownik otwiera stronę przesyłania zdjęć (`/upload`).
2. Użytkownik wybiera plik do przesłania i zatwierdza formularz.
3. Aplikacja zapisuje przesłany plik w katalogu `public/img/uploads` oraz dodaje informację o zdjęciu i użytkowniku do zmiennej `photoData`.

**Rezultat:** Nowe zdjęcie jest dostępne w galerii i widoczne dla wszystkich zalogowanych użytkowników.

#### 5. Usuwanie Zdjęcia (Administrator)
**Opis:** Administrator może usuwać zdjęcia z galerii.

**Kroki:**
1. Administrator otwiera stronę galerii (`/gallery`).
2. Administrator wybiera zdjęcie do usunięcia i zatwierdza operację.
3. Aplikacja usuwa plik z katalogu `public/img/uploads` oraz aktualizuje zmienną `photoData`.

**Rezultat:** Wybrane zdjęcie jest usunięte z galerii.

#### 6. Wylogowanie Użytkownika
**Opis:** Zalogowany użytkownik może się wylogować.

**Kroki:**
1. Użytkownik klika przycisk wylogowania.
2. Aplikacja niszczy sesję użytkownika i przekierowuje go na stronę główną (`/`).

**Rezultat:** Użytkownik zostaje wylogowany i traci dostęp do funkcji wymagających logowania.

   - Aktor: Użytkownik
   - Przypadki użycia: Wylogowanie

### Technologie
- Node.js
- Express
- EJS (Embedded JavaScript)
- Multer
- Express-session
- Body-parser
- File System

### Struktura Katalogów
- `server.js`: Główny plik serwera
- `views/`: Katalog zawierający pliki widoków EJS
  - `index.ejs`: Strona główna
  - `login.ejs`: Strona logowania
  - `upload.ejs`: Strona przesyłania zdjęć
  - `gallery.ejs`: Strona galerii
- `public/img/uploads`: Katalog do przechowywania przesłanych zdjęć

### Pliki i Ich Funkcje

#### `server.js`
Główny plik serwera zawiera konfigurację serwera, middleware oraz routing aplikacji.

##### Middleware
- `express.static('public')`: Serwuje statyczne pliki z katalogu `public`.
- `express-session`: Zarządza sesjami użytkowników.
- `body-parser.urlencoded({ extended: true })`: Parsuje dane z formularzy.
- `requireLogin`: Sprawdza, czy użytkownik jest zalogowany.
- `requireAdmin`: Sprawdza, czy użytkownik jest administratorem.

##### Routing
- `GET /`: Wyświetla stronę główną.
- `GET /login`: Wyświetla stronę logowania.
- `POST /login`: Obsługuje logowanie użytkowników.
- `GET /logout`: Wylogowuje użytkownika.
- `GET /upload`: Wyświetla stronę przesyłania zdjęć (wymaga zalogowania).
- `POST /upload`: Obsługuje przesyłanie zdjęć (wymaga zalogowania).
- `GET /gallery`: Wyświetla galerię zdjęć (wymaga zalogowania).
- `POST /delete`: Usuwa zdjęcie (wymaga zalogowania jako administrator).

##### Szablony node.js
- `index.ejs` - strona główna, wyświetla powitanie użytkownika.
- `login.ejs` - strona logowania, zawiera formularz logowania.
- `upload.ejs` - strona przesyłania zdjęć, zawiera formularz do przesyłania zdjęć.
- `gallery.ejs` - strona galerii, wyświetla przesłane zdjęcia wraz z informacją o użytkowniku, który je przesłał.

### Uruchomienie Projektu

1. Zainstaluj wymagane zależności:
   ```bash
   npm install
   ```
2. Uruchom serwer:
   ```bash
   node server.js
   ```
3. Otwórz przeglądarkę i przejdź do `http://localhost:3000`.

### Dodatkowe Uwagi
- Lista użytkowników z przypisanymi rolami znajduje się w zmiennej `guestsList` w pliku `server.js`.
- Przesłane zdjęcia są zapisywane w katalogu `public/img/uploads`.
- Informacje o zdjęciach i użytkownikach są przechowywane w tablicy `photoData`.

### Poziomy Użytkowników
- `User`: ma możliwość przeglądania galerii oraz dodania zdjęcia.
- `Admin`: ma możliwości poziomu `User` oraz możliwość usuwania zdjęć. 

### Technologie Używane w Projekcie

#### Node.js
Node.js to środowisko uruchomieniowe JavaScript, które pozwala na uruchamianie kodu JavaScript poza przeglądarką. Jest zbudowane na silniku V8 firmy Google, co czyni go szybkim i wydajnym. Node.js jest popularny w tworzeniu serwerów HTTP i aplikacji sieciowych dzięki swojej asynchronicznej naturze i obsłudze zdarzeń.

#### Express
Express to framework webowy dla Node.js, który upraszcza tworzenie aplikacji sieciowych i API. Zapewnia zestaw narzędzi do zarządzania routingiem, middleware oraz obsługę żądań i odpowiedzi HTTP. Dzięki prostocie i elastyczności, Express jest jednym z najczęściej używanych frameworków do budowy serwerów Node.js.

#### EJS (Embedded JavaScript)
EJS to silnik szablonów, który umożliwia wstawianie kodu JavaScript bezpośrednio do plików HTML. Używany jest do generowania dynamicznych stron HTML po stronie serwera. EJS pozwala na łatwe przekazywanie danych do widoków i renderowanie ich w przeglądarce użytkownika.

#### Multer
Multer to middleware dla frameworka Express, które ułatwia obsługę przesyłania plików. Umożliwia przetwarzanie formularzy zawierających pliki i ich zapisywanie na serwerze. Jest szczególnie przydatne w aplikacjach, które wymagają przesyłania plików, takich jak obrazy czy dokumenty.

#### Express-session
Express-session to middleware do zarządzania sesjami w aplikacjach Express. Umożliwia przechowywanie informacji o użytkownikach między różnymi żądaniami HTTP, co jest niezbędne do implementacji funkcji takich jak logowanie, koszyki zakupowe czy personalizowane ustawienia użytkownika. W kontekście omawianej aplikacji, odpowiada za logowanie oraz sprawdzanie uprawnień użytkownika.

#### Body-parser
Body-parser to middleware dla Express, które ułatwia parsowanie treści żądań HTTP, zwłaszcza danych przesyłanych w formularzach i JSON. Umożliwia dostęp do danych z formularza poprzez obiekt `r	eq.body`, co upraszcza ich dalsze przetwarzanie.

#### File System (fs)
Moduł File System w Node.js zapewnia funkcje do pracy z systemem plików, takie jak odczytywanie, zapisywanie, usuwanie plików oraz przeglądanie katalogów. W projekcie jest używany do zarządzania przesyłanymi obrazami.

### Dodatkowe technologie

### Render

Render to platforma hostingowa, która umożliwia łatwe wdrażanie i skalowanie aplikacji webowych. Oferuje szeroki zakres usług, takich jak hosting statycznych stron internetowych, aplikacji webowych, baz danych, a także backendów i mikrousług. Render automatycznie obsługuje wdrożenia z repozytoriów GitHub, co upraszcza proces publikacji i aktualizacji aplikacji. Platforma jest ceniona za swoją prostotę, wydajność i łatwość użycia, co czyni ją idealnym wyborem dla zarówno małych, jak i dużych projektów.

### GitHub

GitHub to popularna platforma do hostowania repozytoriów Git, używana przez miliony programistów na całym świecie. Umożliwia zarządzanie kodem źródłowym, śledzenie zmian, współpracę zespołową oraz zarządzanie projektami. GitHub oferuje wiele funkcji, takich jak pull requesty, issues, GitHub Actions do automatyzacji procesów CI/CD, oraz GitHub Pages do hostowania statycznych stron internetowych. Dzięki integracji z Render, możliwe jest automatyczne wdrażanie aplikacji przy każdym wprowadzeniu zmian do repozytorium.
