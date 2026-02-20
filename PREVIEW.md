# How to Preview the Website

Follow these steps **in order** from the project folder: `c:\wamp64\www\smartdigipulse`

---

## Option A: Quick preview (recommended)

### 1. Install frontend dependencies (once)
```bash
npm install
```

### 2. Build the frontend (once, or after changing JS/CSS)
```bash
npm run build
```

### 3. Start the Laravel server
```bash
php artisan serve
```

### 4. Open in browser
Go to: **http://localhost:8000**

---

## Option B: Development mode (with hot reload)

Use **two terminals** in the same folder.

**Terminal 1 – Laravel:**
```bash
php artisan serve
```

**Terminal 2 – Vite (assets + hot reload):**
```bash
npm run dev
```

Then open: **http://localhost:8000**

---

## If the page is blank or unstyled

- Make sure you ran `npm install` and then **either** `npm run build` **or** `npm run dev` (in a separate terminal).
- If you only run `php artisan serve` without building or running Vite, the page will load but without styles or React.

## Database (optional)

To see Services and Portfolio content from the database:

1. Create a MySQL database (e.g. `smartdigipulse`).
2. In `.env`, set `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`.
3. Run:
   ```bash
   php artisan migrate
   php artisan db:seed --class=SampleDataSeeder
   ```

Without the database, the site still loads; Services and Portfolio use fallback content.
