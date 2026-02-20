# Sldigitasystem - Official Website

A modern, sleek website for Sldigitasystem IT software company built with Laravel (API backend) and React (SPA frontend).

## Tech Stack

- **Backend**: Laravel 12 (API only)
- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS 4
- **Database**: MySQL

## Features

- ✅ Responsive design with dark mode aesthetics
- ✅ Modern animations and smooth transitions
- ✅ Hero section with gradient effects
- ✅ Services showcase
- ✅ Portfolio/Projects gallery
- ✅ Contact form with API integration
- ✅ Fully responsive navigation
- ✅ Social media links in footer

## Project Structure

```
smartdigipulse/
├── app/
│   ├── Http/Controllers/Api/    # API Controllers
│   └── Models/                   # Eloquent Models
├── database/migrations/          # Database migrations
├── resources/
│   ├── js/
│   │   ├── components/           # React components
│   │   └── app.jsx               # React entry point
│   ├── css/
│   │   └── app.css               # Tailwind CSS
│   └── views/
│       └── app.blade.php         # Main Blade template
└── routes/
    ├── api.php                   # API routes
    └── web.php                   # Web routes (SPA)
```

## Setup Instructions

### Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js 18+ and npm
- MySQL

### Installation Steps

1. **Install PHP Dependencies**
   ```bash
   composer install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
   
   Update `.env` with your database credentials:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=smartdigipulse
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

3. **Run Migrations**
   ```bash
   php artisan migrate
   ```

4. **Install Node Dependencies**
   ```bash
   npm install
   ```

5. **Build Assets (Production)**
   ```bash
   npm run build
   ```
   
   Or for development with hot reload:
   ```bash
   npm run dev
   ```

6. **Start Laravel Server**
   ```bash
   php artisan serve
   ```

   The application will be available at `http://localhost:8000`

## API Endpoints

All API endpoints are prefixed with `/api/v1`:

- `GET /api/v1/services` - Get all active services
- `GET /api/v1/projects` - Get all active projects
- `GET /api/v1/projects/featured` - Get featured projects
- `GET /api/v1/testimonials` - Get all active testimonials
- `POST /api/v1/contact` - Submit contact form

### Contact Form Example

```json
POST /api/v1/contact
{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "subject": "Project Inquiry",
    "message": "I'm interested in your services..."
}
```

## Database Schema

### Services
- id, title, description, icon, order, is_active, timestamps

### Projects
- id, title, description, image, category, client, project_date, project_url, technologies (JSON), order, is_featured, is_active, timestamps

### Testimonials
- id, name, position, company, testimonial, avatar, rating, order, is_active, timestamps

### Contact Messages
- id, name, email, phone, subject, message, is_read, timestamps

## Development

### Running in Development Mode

1. Terminal 1 - Laravel server:
   ```bash
   php artisan serve
   ```

2. Terminal 2 - Vite dev server:
   ```bash
   npm run dev
   ```

### Adding Sample Data

You can create seeders to populate the database with sample data:

```bash
php artisan make:seeder ServiceSeeder
php artisan make:seeder ProjectSeeder
php artisan make:seeder TestimonialSeeder
```

## Production Deployment

1. Build assets:
   ```bash
   npm run build
   ```

2. Optimize Laravel:
   ```bash
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

3. Set up your web server (Apache/Nginx) to point to the `public` directory.

## Customization

### Colors and Styling

The design uses Tailwind CSS with custom gradient colors. Main accent colors:
- Cyan: `#06b6d4` (cyan-500)
- Blue: `#3b82f6` (blue-500)
- Purple: `#9333ea` (purple-600)

You can customize these in the component files or extend Tailwind config.

### Adding New Sections

1. Create a new React component in `resources/js/components/`
2. Import and add it to `App.jsx`
3. Add corresponding API endpoint if needed

## License

This project is proprietary software for Sldigitasystem.

## Support

For issues or questions, please contact the development team.
