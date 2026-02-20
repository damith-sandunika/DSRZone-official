# Quick Setup Guide

## Step-by-Step Setup

### 1. Install Dependencies

```bash
# Install PHP dependencies (if not already done)
composer install

# Install Node dependencies
npm install
```

### 2. Configure Environment

```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

Edit `.env` and set your database credentials:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=smartdigipulse
DB_USERNAME=root
DB_PASSWORD=
```

### 3. Create Database

Create a MySQL database named `smartdigipulse` (or your preferred name).

### 4. Run Migrations

```bash
php artisan migrate
```

### 5. Seed Sample Data (Optional)

```bash
php artisan db:seed --class=SampleDataSeeder
```

Or seed all data:
```bash
php artisan db:seed
```

### 6. Build Assets

**For Development:**
```bash
npm run dev
```

**For Production:**
```bash
npm run build
```

### 7. Start Development Server

In one terminal:
```bash
php artisan serve
```

If using `npm run dev`, Vite will run on a different port (usually 5173). The Laravel app will automatically use the Vite dev server in development mode.

### 8. Access the Application

Open your browser and navigate to:
- `http://localhost:8000` (Laravel server)
- The Vite dev server URL will be shown in the terminal when you run `npm run dev`

## Troubleshooting

### Issue: "vendor/autoload.php not found"
**Solution:** Run `composer install`

### Issue: "Class not found" errors
**Solution:** Run `composer dump-autoload`

### Issue: API calls failing
**Solution:** 
1. Make sure CORS is properly configured (already done in `bootstrap/app.php`)
2. Check that API routes are accessible at `/api/v1/*`
3. Verify CSRF token is included in requests

### Issue: React components not loading
**Solution:**
1. Make sure you're running `npm run dev` or have built assets with `npm run build`
2. Check browser console for errors
3. Verify `resources/js/app.jsx` is being loaded

### Issue: Tailwind styles not applying
**Solution:**
1. Make sure Tailwind is properly configured in `vite.config.js`
2. Check that `resources/css/app.css` is imported in `app.jsx`
3. Rebuild assets: `npm run build`

## Next Steps

1. Customize the content in React components
2. Add your own images to the portfolio
3. Update social media links in Footer component
4. Configure email settings in `.env` for contact form notifications
5. Add more services, projects, or testimonials through the database

## Production Deployment

1. Set `APP_ENV=production` and `APP_DEBUG=false` in `.env`
2. Run `npm run build` to compile assets
3. Run `php artisan config:cache`
4. Run `php artisan route:cache`
5. Point your web server to the `public` directory

