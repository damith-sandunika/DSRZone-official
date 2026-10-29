<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Project;
use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;

class DsrZoneProductionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Ensure Super Admin Account
        $adminEmail = env('ADMIN_DEFAULT_EMAIL', 'admin@dsrzone.com');
        $adminPassword = env('ADMIN_DEFAULT_PASSWORD', 'admin123456');

        User::updateOrCreate(
            ['email' => $adminEmail],
            [
                'name' => 'DSRZone Admin',
                'password' => Hash::make($adminPassword),
                'is_admin' => true,
            ]
        );

        // 2. Services (In exact order requested)
        $services = [
            [
                'title' => 'Mobile Applications',
                'subtitle' => 'High-Performance iOS & Android Apps',
                'description' => 'End-to-end mobile app development powered by Flutter and React Native. Fast, secure, and user-centric apps built for modern smartphones.',
                'features' => [
                    ['title' => 'Native & Cross-Platform', 'description' => 'Silky 60fps performance on iOS & Android using Flutter & React Native.'],
                    ['title' => 'Offline & Cloud Sync', 'description' => 'Real-time database sync with offline mode and push notifications.'],
                    ['title' => 'App Store Launch', 'description' => 'Complete deployment and approval assistance for Apple App Store & Google Play.'],
                ],
                'icon' => 'smartphone',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Web Based Systems',
                'subtitle' => 'Enterprise ERP, CRM & Business Automation',
                'description' => 'Tailor-made cloud management systems designed to streamline daily operations, track real-time analytics, and eliminate paperwork.',
                'features' => [
                    ['title' => 'Multi-Branch Sync', 'description' => 'Centralized database linking multiple locations with real-time inventory and sales.'],
                    ['title' => 'Automated Invoicing & POS', 'description' => 'Fast barcode billing, thermal receipt printing, and digital invoice generation.'],
                    ['title' => 'Role-Based Security', 'description' => 'Granular user permission levels with comprehensive audit trail logs.'],
                ],
                'icon' => 'layers',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Website Development',
                'subtitle' => 'Ultra-Fast, Responsive & SEO-Ready Websites',
                'description' => 'Cutting-edge corporate websites and landing pages built with modern web technologies that convert visitors into paying clients.',
                'features' => [
                    ['title' => 'Ultra Fast Loading', 'description' => 'Optimized for 95+ Google PageSpeed score and instant mobile rendering.'],
                    ['title' => 'SEO & Social Ready', 'description' => 'Pre-configured OpenGraph tags, schema markup, and Google Search indexing.'],
                    ['title' => 'Mobile Responsive', 'description' => 'Pixel-perfect adaptive layouts across smartphones, tablets, and desktops.'],
                ],
                'icon' => 'code',
                'order' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'Custom Software Development',
                'subtitle' => 'Bespoke Software Architecture for Your Workflows',
                'description' => 'Engineered from scratch to solve your unique business challenges, integrate with custom APIs, and scale without limitations.',
                'features' => [
                    ['title' => 'Custom Workflows', 'description' => 'Software tailored exactly to your unique company processes and rules.'],
                    ['title' => 'API & Payment Integration', 'description' => 'Seamless connection with bank payment gateways, SMS providers, and external systems.'],
                    ['title' => 'Long-Term Scalability', 'description' => 'Clean, maintainable architecture with 99.9% uptime and cloud backups.'],
                ],
                'icon' => 'settings',
                'order' => 4,
                'is_active' => true,
            ],
            [
                'title' => 'Social Media Marketing',
                'subtitle' => 'Data-Driven Digital Campaigns & Brand Growth',
                'description' => 'High-ROI digital marketing strategies, engaging creative graphic design, and targeted advertising campaigns that accelerate sales.',
                'features' => [
                    ['title' => 'Targeted Ad Campaigns', 'description' => 'High-conversion paid ads across Facebook, Instagram, TikTok, and Google Ads.'],
                    ['title' => 'Brand Content Design', 'description' => 'Stunning promotional banners, video reels, and product launch creatives.'],
                    ['title' => 'Audience Growth & Analytics', 'description' => 'Monthly growth reports, customer acquisition metrics, and retargeting funnels.'],
                ],
                'icon' => 'megaphone',
                'order' => 5,
                'is_active' => true,
            ],
        ];

        foreach ($services as $svc) {
            Service::updateOrCreate(
                ['title' => $svc['title']],
                $svc
            );
        }

        // 3. Products (In exact order requested)
        $products = [
            [
                'slug' => 'smart-laundry-management-system',
                'name' => 'Smart Laundry Pro — Automated Laundry & Dry Cleaning Management System',
                'tagline' => 'End-to-End Laundry Workflow, Garment Tagging & Customer Tracking',
                'description' => 'Specialized management software for laundry businesses and dry cleaners with barcode garment tracking, SMS updates, and delivery routing.',
                'long_description' => 'Smart Laundry Pro is a modern cloud-based system engineered specifically for commercial laundries, dry cleaning chains, and laundromats. It automates every step from customer order intake and garment tagging to wash cycle monitoring, quality checks, and automated ready-for-pickup SMS alerts. Easily manage drivers, track pick-up/drop-off routes, and operate multiple store branches with real-time synchronized data.',
                'icon' => 'laundry',
                'status' => 'available',
                'accent_color' => '#0ea5e9',
                'features' => [
                    'Garment Barcode Tagging & Scan Tracking',
                    'Automated Customer SMS & WhatsApp Notifications',
                    'Driver Pick-Up & Delivery Dispatch Routing',
                    'Multi-Branch & Store Inventory Synchronization',
                    'POS Billing with Thermal Printing & Cash Drawer Support',
                    'Daily Cash Register & Income-Expense Accounts',
                ],
                'benefits' => [
                    'Eliminate misplaced or lost garments with individual barcode scan tracking.',
                    'Increase customer repeat rate with instant SMS alerts when clothes are washed and ironed.',
                    'Save 4+ hours daily on manual accounting, receipt writing, and phone calls.',
                    'Gain complete financial clarity with automated multi-branch profit & loss reports.',
                ],
                'installation_steps' => [
                    'Cloud database initialization and store branding setup.',
                    'Printer and barcode scanner hardware configuration.',
                    'Staff cashier and laundry operator hands-on training.',
                    'Go-live with dedicated 24/7 technical customer support.',
                ],
                'price_one_time' => 'LKR 85,000',
                'price_monthly' => 'LKR 4,500/mo',
                'price_note' => 'Includes full cloud hosting, automated SMS setup & thermal printer drivers',
                'cta_primary_text' => 'Get Free Demo',
                'cta_primary_url' => '/#contact',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'slug' => 'driving-school-management-system',
                'name' => 'SmartDrive ERP — Driving School & Learner Management System',
                'tagline' => 'Student Training Sessions, RMV Exam Schedules & Automated Fee Invoicing',
                'description' => 'Complete digital management platform for driving schools to organize student lessons, instructor vehicles, trial exams, and payments.',
                'long_description' => 'SmartDrive ERP empowers driving training schools to transition away from messy paper registers and chaotic schedules. Instructors can schedule daily driving practices, allocate training vehicles without double-booking, and monitor student trial progress. Students receive automated reminder alerts for RMV trial tests, medical dates, and installment fee balances.',
                'icon' => 'car',
                'status' => 'available',
                'accent_color' => '#3b82f6',
                'features' => [
                    'Instructor & Vehicle Timetables with Zero Overlap',
                    'Student Practice Slot Booking & Attendance Record',
                    'RMV Trial Exam & Medical Appointment Scheduler',
                    'Automated Fee Installment & Overdue SMS Alerts',
                    'Student Progress Logs (Heavy, Light, Motorcycle, Auto)',
                    'Fuel Expense & Vehicle Maintenance Tracker',
                ],
                'benefits' => [
                    'Prevent training vehicle and instructor double-booking completely.',
                    'Drastically reduce overdue fee payments through automated SMS payment reminders.',
                    'Store digital copies of student NIC, medical certificates, and permit numbers securely.',
                    'Keep students updated with instant trial exam schedule notifications.',
                ],
                'installation_steps' => [
                    'System deployment and driving school branch profile configuration.',
                    'Student vehicle and instructor roster onboarding.',
                    'Administrative staff training on fee receipting and trial planning.',
                    'Live rollout with ongoing maintenance support.',
                ],
                'price_one_time' => 'LKR 95,000',
                'price_monthly' => 'LKR 5,000/mo',
                'price_note' => 'Includes unlimited student records & automated SMS integration',
                'cta_primary_text' => 'Request System Demo',
                'cta_primary_url' => '/#contact',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'slug' => 'pet-shop-clinic-management-system',
                'name' => 'PetCare Pro — Pet Shop & Veterinary Clinic Management System',
                'tagline' => 'Pet Grooming Bookings, Clinic Records, Pet Supplies & Vaccine Reminders',
                'description' => 'All-in-one system for pet shops, grooming salons, and veterinary clinics with inventory, appointment bookings, and pet health history.',
                'long_description' => 'PetCare Pro combines modern retail point-of-sale with specialized pet clinic and salon features. Pet shops can scan barcodes to sell pet foods, accessories, and healthcare products with automated batch expiry warnings. Veterinary clinics can maintain digital pet medical files, record weight and vaccinations, and send automated vaccine reminder alerts to pet owners.',
                'icon' => 'heart',
                'status' => 'available',
                'accent_color' => '#10b981',
                'features' => [
                    'Pet Medical History & Vaccination Log',
                    'Pet Grooming Salon Appointment Scheduler',
                    'High-Speed Barcode Pet Food & Supplies POS',
                    'Batch & Expiry Date Management with Auto Warnings',
                    'Client Pet Profiles with Breed, Age & Allergies',
                    'Automated Vaccine Due Reminders via WhatsApp & SMS',
                ],
                'benefits' => [
                    'Ensure repeat clinic visits with automated vaccination and booster reminders.',
                    'Eliminate dead stock and losses using batch expiry alerts on pet food and medicine.',
                    'Speed up counter billing with fast barcode scanner and receipt printer support.',
                    'Manage grooming queues and technician commission effortlessly.',
                ],
                'installation_steps' => [
                    'Product catalog and pet medicine inventory data import.',
                    'Barcode scanner and receipt printer integration.',
                    'Staff and clinic receptionist workflow training.',
                    'Full production deployment with cloud database backup.',
                ],
                'price_one_time' => 'LKR 80,000',
                'price_monthly' => 'LKR 4,000/mo',
                'price_note' => 'One-time setup with lifetime database license available',
                'cta_primary_text' => 'Get Free Demo',
                'cta_primary_url' => '/#contact',
                'order' => 3,
                'is_active' => true,
            ],
            [
                'slug' => 'restaurant-pos-billing-system',
                'name' => 'DineFlow — Restaurant POS & Kitchen Display System (KDS)',
                'tagline' => 'High-Speed Dine-In POS, Kitchen Display Screen (KDS) & QR Ordering',
                'description' => 'High-performance point-of-sale software for restaurants, cafes, and bars with live kitchen display, table floor plans, and QR menus.',
                'long_description' => 'DineFlow revolutionizes food and beverage operations by connecting waiters, kitchen chefs, and cashiers in real time. Waiters take orders on mobile tablets or POS counters, instantly routing tickets to kitchen display screens (KDS) or thermal KOT printers. Supports visual table layouts, split bills, multi-currency payments, recipe ingredient deduction, and interactive QR menus.',
                'icon' => 'utensils',
                'status' => 'available',
                'accent_color' => '#f59e0b',
                'features' => [
                    'Live Kitchen Display Screen (KDS) & Thermal KOT Routing',
                    'Interactive Table Floor Plan & Seat Reservation',
                    'Contactless QR Code Digital Table Menu',
                    'Recipe Costing & Real-Time Ingredient Deduction',
                    'Split Bill, Card, Cash & Digital Wallet Checkout',
                    'Daily Sales, Waiter Tips & End-of-Day Settlement (Z-Report)',
                ],
                'benefits' => [
                    'Zero order misunderstandings between dining floor and kitchen staff.',
                    'Faster table turnaround times, increasing peak-hour restaurant revenue.',
                    'Prevent food theft and stock leakage with automated recipe inventory deductions.',
                    'Real-time smartphone dashboard for owners to monitor daily sales from anywhere.',
                ],
                'installation_steps' => [
                    'Menu items, categories, variants, and ingredient pricing setup.',
                    'Kitchen display screens and thermal KOT network installation.',
                    'Captain, waiter, and cashier team hands-on training.',
                    'Live launch with on-site pilot supervision.',
                ],
                'price_one_time' => 'LKR 110,000',
                'price_monthly' => 'LKR 6,000/mo',
                'price_note' => 'Supports unlimited KOT printers & tablet order terminals',
                'cta_primary_text' => 'Request POS Demo',
                'cta_primary_url' => '/#contact',
                'order' => 4,
                'is_active' => true,
            ],
            [
                'slug' => 'hotel-resort-reservation-pms',
                'name' => 'HavenPMS — Hotel & Resort Reservation Management System',
                'tagline' => 'Direct Booking Engine, Front-Desk Check-In & Housekeeping Management',
                'description' => 'Cloud property management system (PMS) for boutique hotels, holiday resorts, and villas with direct online bookings and guest folios.',
                'long_description' => 'HavenPMS gives hoteliers and villa operators complete independence from high OTA commissions. Featuring a modern commission-free direct booking engine for your website, interactive visual room grid, guest check-in/out folio manager, and live housekeeping statuses. Supports foreign currencies, government tax levies, and banquet event bookings.',
                'icon' => 'hotel',
                'status' => 'available',
                'accent_color' => '#6366f1',
                'features' => [
                    'Commission-Free Direct Online Booking Engine',
                    'Visual Room Availability Calendar Grid',
                    'Guest Folio Billing, Advance Payments & Invoicing',
                    'Housekeeping Status (Clean, Dirty, In-Progress, Out-of-Order)',
                    'Multi-Currency Support (USD, EUR, GBP, LKR)',
                    'Banquet Hall & Event Reservation Management',
                ],
                'benefits' => [
                    'Save 15% to 25% in OTA commissions with direct website reservations.',
                    'Prevent accidental overbooking with live room calendar synchronization.',
                    'Instantly see room cleaning statuses and dispatch housekeeping staff quickly.',
                    'Automated PDF invoice generation and registration cards for international travelers.',
                ],
                'installation_steps' => [
                    'Room types, rates, seasonal surcharges, and photos onboarding.',
                    'Payment gateway integration for direct online card authorizations.',
                    'Front-desk reception and reservation desk staff training.',
                    'System deployment with automated daily cloud backups.',
                ],
                'price_one_time' => 'LKR 125,000',
                'price_monthly' => 'LKR 6,500/mo',
                'price_note' => 'Includes direct booking engine integration into your website',
                'cta_primary_text' => 'Get Free Hotel Demo',
                'cta_primary_url' => '/#contact',
                'order' => 5,
                'is_active' => true,
            ],
            [
                'slug' => 'tailor-shop-garment-management-system',
                'name' => 'StitchCraft — Tailor Shop & Custom Garment Management System',
                'tagline' => 'Customer Measurements Record, Custom Stitching Orders & Delivery Tracking',
                'description' => 'Dedicated software for tailoring businesses, bridal boutiques, and garment designers with digital measurement records and job tracking.',
                'long_description' => 'StitchCraft modernizes the bespoke tailoring and custom bridal wear industry. Keep lifetime digital records of client body measurements (shirts, suits, dresses, trousers, sarees). Track fabric swatches, assign job cards to specific cutters or master tailors, and automatically alert clients via SMS when their garments are ready for fitting or final collection.',
                'icon' => 'scissors',
                'status' => 'available',
                'accent_color' => '#ec4899',
                'features' => [
                    'Comprehensive Digital Body Measurement Sheets',
                    'Tailoring Job Cards with Custom Styling Notes & Sketches',
                    'Fabric & Lining Material Inventory Tracking',
                    'Automated Fitting Date & Collection SMS Reminders',
                    'Master Tailor Work Assignment & Commission Logs',
                    'Advance Deposit, Balance Due & Invoice Receipts',
                ],
                'benefits' => [
                    'Never lose, misplace, or confuse client measurements ever again.',
                    'Build customer loyalty with automated SMS updates on fitting appointments.',
                    'Accurately calculate master tailor wages and piece-rate commissions.',
                    'Track custom order delivery deadlines to guarantee on-time collection.',
                ],
                'installation_steps' => [
                    'Garment measurement profiles and price list configuration.',
                    'Staff cashier and master cutter workstation setup.',
                    'Customer SMS gateway connection.',
                    'Go-live with dedicated ongoing support.',
                ],
                'price_one_time' => 'LKR 75,000',
                'price_monthly' => 'LKR 3,500/mo',
                'price_note' => 'Affordable solution with lifetime measurement records',
                'cta_primary_text' => 'Request System Demo',
                'cta_primary_url' => '/#contact',
                'order' => 6,
                'is_active' => true,
            ],
            [
                'slug' => 'auto-garage-service-station-system',
                'name' => 'AutoFix ERP — Auto Garage & Service Station Management System',
                'tagline' => 'Vehicle Job Cards, Spare Parts Inventory, Estimate & Service Reminders',
                'description' => 'Robust workshop management software for automobile repair centers and lube stations with vehicle job cards and spare parts stock.',
                'long_description' => 'AutoFix ERP is built specifically for automotive repair centers, motor garages, and lube service stations. Create professional vehicle inspection job cards, track vehicle intake photos, and manage spare parts stock with barcode scanning. Automatically calculate mechanic labor hours, generate insurance estimates, and send automated service due SMS alerts based on mileage.',
                'icon' => 'wrench',
                'status' => 'available',
                'accent_color' => '#ef4444',
                'features' => [
                    'Digital Vehicle Inspection & Repair Job Cards',
                    'Spare Parts Stock with Barcode Scanner Billing',
                    'Mechanic Labor Time & Commission Tracking',
                    'Automated Service Due SMS Alerts by Mileage',
                    'Insurance Repair Estimates & Official Invoicing',
                    'Vehicle Maintenance & Service History Archive',
                ],
                'benefits' => [
                    'Bring vehicle owners back regularly with automated service due SMS alerts.',
                    'Eliminate spare parts theft and inventory shrinkage with barcode controls.',
                    'Produce professional branded estimates and invoices that impress customers.',
                    'Quickly access any vehicle complete repair history by typing the license plate.',
                ],
                'installation_steps' => [
                    'Spare parts catalog, lubricants, and service labor pricing upload.',
                    'Barcode scanner and counter printer setup.',
                    'Service advisor and workshop manager workflow training.',
                    'Production launch with daily cloud data backup.',
                ],
                'price_one_time' => 'LKR 98,000',
                'price_monthly' => 'LKR 5,000/mo',
                'price_note' => 'Includes unlimited vehicle records & spare parts inventory',
                'cta_primary_text' => 'Get Garage Demo',
                'cta_primary_url' => '/#contact',
                'order' => 7,
                'is_active' => true,
            ],
            [
                'slug' => 'tuition-institute-class-management-system',
                'name' => 'EduCenter Pro — Tuition & Institute Class Management System',
                'tagline' => 'Student Barcode / QR Attendance, Monthly Class Fees & SMS Alerts',
                'description' => 'Enterprise student and class management platform for educational institutes and tuition centers with barcode gate access and fee cards.',
                'long_description' => 'EduCenter Pro streamlines high-volume educational institutes, tuition academies, and vocational colleges. Fast barcode or RFID gate scanners process student entrance in milliseconds, sending instant SMS alerts to parents. Manage monthly tuition fee card stamping, track unpaid fees with automated warnings, and generate accurate teacher payout and commission sheets in seconds.',
                'icon' => 'graduation-cap',
                'status' => 'available',
                'accent_color' => '#8b5cf6',
                'features' => [
                    'High-Speed Barcode / RFID Student Gate Attendance',
                    'Monthly Class Fee Cards with Instant Barcode Invoicing',
                    'Automated SMS to Parents on Student Gate Arrival',
                    'Teacher Share & Commission Calculation in One Click',
                    'Student Exam Marks, Rank & Report Card Generation',
                    'SMS Broadcasting for Class Schedule Announcements',
                ],
                'benefits' => [
                    'Speed through morning entrance queues with 0.5-second barcode scanning.',
                    'Eliminate class fee fraud through digital student identification checks.',
                    'Reassure parents with instant SMS confirmations when children enter the institute.',
                    'Generate tutor earnings and institute revenue summaries with zero manual math.',
                ],
                'installation_steps' => [
                    'Class batches, subjects, tutor share percentages, and fee rates setup.',
                    'Barcode gate scanners and student ID card printer connection.',
                    'Staff and administration desk training.',
                    'Go-live rollout with ongoing technical support.',
                ],
                'price_one_time' => 'LKR 90,000',
                'price_monthly' => 'LKR 4,500/mo',
                'price_note' => 'Designed for institutes handling 100 to 10,000+ students',
                'cta_primary_text' => 'Request Institute Demo',
                'cta_primary_url' => '/#contact',
                'order' => 8,
                'is_active' => true,
            ],
        ];

        $productMap = [];
        foreach ($products as $prod) {
            $created = Product::updateOrCreate(
                ['slug' => $prod['slug']],
                $prod
            );
            $productMap[$prod['slug']] = $created->id;
        }

        // 4. Projects / Portfolio (In exact order requested)
        $projects = [
            [
                'title' => '365 Laundry — Smart On-Demand Laundry & Dry Cleaning Platform',
                'client' => '365laundry.lk',
                'category' => 'Laundry Management & Web Platform',
                'project_url' => 'https://365laundry.lk',
                'product_id' => $productMap['smart-laundry-management-system'] ?? null,
                'description' => 'Modern on-demand laundry and garment care web platform with automated pickup scheduling, live garment status tracking, and SMS alerts.',
                'problem' => 'The client managed daily orders manually via phone calls, leading to misplaced clothing, delayed customer updates, and inefficient driver routes.',
                'solution' => 'Engineered a seamless online booking portal with automated garment barcode tracking, driver dispatch system, and instant SMS alerts.',
                'technologies' => ['Laravel', 'React', 'MySQL', 'TailwindCSS', 'SMS Gateway'],
                'accent_color' => '#0ea5e9',
                'map_city' => 'Colombo',
                'map_x' => 41.5,
                'map_y' => 61.5,
                'order' => 1,
                'is_featured' => true,
                'is_active' => true,
            ],
            [
                'title' => 'River Cottage — Eco Luxury Boutique Villa & Resort',
                'client' => 'rivercottagesl.com',
                'category' => 'Boutique Hotel & Direct Booking',
                'project_url' => 'https://rivercottagesl.com',
                'product_id' => $productMap['hotel-resort-reservation-pms'] ?? null,
                'description' => 'Tranquil eco-luxury boutique resort web portal featuring interactive room showcases, commission-free direct booking engine, and local excursions.',
                'problem' => 'High third-party OTA commission fees and lack of an appealing digital presence for direct international tourist bookings.',
                'solution' => 'Developed a high-speed, immersive hospitality website with an integrated direct booking calendar, payment gateway, and high-ranking SEO architecture.',
                'technologies' => ['Laravel', 'TailwindCSS', 'Payment Gateway', 'SEO Architecture'],
                'accent_color' => '#10b981',
                'map_city' => 'Bentota',
                'map_x' => 43.5,
                'map_y' => 72.0,
                'order' => 2,
                'is_featured' => true,
                'is_active' => true,
            ],
            [
                'title' => 'Nellikale Holiday Resort — Nature Sanctuary & Hotel Portal',
                'client' => 'nellikaleholidayresort.com',
                'category' => 'Hotel & Resort Management',
                'project_url' => 'https://nellikaleholidayresort.com',
                'product_id' => $productMap['hotel-resort-reservation-pms'] ?? null,
                'description' => 'Full-featured hospitality portal showcasing luxury rooms, natural eco-surroundings, banquet facilities, and wedding event reservations.',
                'problem' => 'Potential guests struggled to view room amenities and event banquet packages, resulting in lost bookings to competitors.',
                'solution' => 'Built a visually captivating hotel web platform with instant room availability checks, banquet inquiry forms, and automated guest confirmations.',
                'technologies' => ['React', 'Laravel API', 'MySQL', 'High-Speed CDN'],
                'accent_color' => '#6366f1',
                'map_city' => 'Kurunegala',
                'map_x' => 47.5,
                'map_y' => 48.0,
                'order' => 3,
                'is_featured' => true,
                'is_active' => true,
            ],
            [
                'title' => 'Sisira Driving School — Online Learner Management & Exam Portal',
                'client' => 'sisiradrivingtrainingschool.lk',
                'category' => 'Education & ERP Systems',
                'project_url' => 'https://sisiradrivingtrainingschool.lk',
                'product_id' => $productMap['driving-school-management-system'] ?? null,
                'description' => 'Comprehensive driving school student portal enabling practice lesson scheduling, RMV trial exam management, and digital fee payments.',
                'problem' => 'Managing hundreds of active students across multiple instructors using paper registers led to schedule overlaps and payment tracking errors.',
                'solution' => 'Created an intuitive cloud ERP system that automates lesson timetables, vehicle allocation, and trial exam reminders via SMS.',
                'technologies' => ['Laravel', 'Livewire', 'SMS API', 'Bootstrap'],
                'accent_color' => '#3b82f6',
                'map_city' => 'Gampaha',
                'map_x' => 42.0,
                'map_y' => 56.5,
                'order' => 4,
                'is_featured' => true,
                'is_active' => true,
            ],
            [
                'title' => 'Winlion Agro — Agricultural Equipment & Products E-Commerce',
                'client' => 'winlion.com',
                'category' => 'E-Commerce & Digital Commerce',
                'project_url' => 'https://winlion.com',
                'product_id' => null,
                'description' => 'Islandwide agricultural machinery, seeds, and farming equipment e-commerce store with categorized search and instant WhatsApp ordering.',
                'problem' => 'Farmers and commercial growers across Sri Lanka required an easy way to view agro machinery specs, check prices, and order with islandwide delivery.',
                'solution' => 'Developed a high-performance e-commerce platform with categorized technical product catalogs, automated delivery pricing, and 1-click WhatsApp checkout.',
                'technologies' => ['React', 'Laravel REST API', 'Payment Gateway', 'SEO Suite'],
                'accent_color' => '#f59e0b',
                'map_city' => 'Dambulla',
                'map_x' => 53.0,
                'map_y' => 42.0,
                'order' => 5,
                'is_featured' => true,
                'is_active' => true,
            ],
            [
                'title' => 'Sunreach Restaurant — Fine Dining Experience & Digital Menu',
                'client' => 'sunreach.lk',
                'category' => 'Hospitality & Restaurant POS',
                'project_url' => 'https://sunreach.lk',
                'product_id' => $productMap['restaurant-pos-billing-system'] ?? null,
                'description' => 'Vibrant coastal dining website with digital QR menu, online table reservation system, and promotional event showcase.',
                'problem' => 'Printed menus were expensive to update frequently, and walk-in guest management was inefficient during peak dinner hours.',
                'solution' => 'Delivered an ultra-modern restaurant platform with dynamic digital menus, online table booking, and Google My Business local SEO integration.',
                'technologies' => ['React', 'TailwindCSS', 'Cloudflare CDN', 'SEO'],
                'accent_color' => '#f97316',
                'map_city' => 'Matara',
                'map_x' => 51.5,
                'map_y' => 88.5,
                'order' => 6,
                'is_featured' => true,
                'is_active' => true,
            ],
            [
                'title' => 'Hanthana Sky Paradise — Mountain View Luxury Villa & Resort',
                'client' => 'hanthanaskparadise.com',
                'category' => 'Luxury Hospitality & Direct Booking',
                'project_url' => 'https://hanthanaskparadise.com',
                'product_id' => $productMap['hotel-resort-reservation-pms'] ?? null,
                'description' => 'Exclusive mountain-view boutique resort portal with multi-currency booking engine, panoramic virtual tours, and custom excursion packages.',
                'problem' => 'Attracting high-value international travelers required a prestigious web presentation with multi-currency payments and zero language barriers.',
                'solution' => 'Designed a breathtaking luxury hotel experience with live currency conversion, interactive mountain trail maps, and instant reservation processing.',
                'technologies' => ['Laravel', 'React', 'Multi-Currency', 'Interactive Maps'],
                'accent_color' => '#8b5cf6',
                'map_city' => 'Kandy',
                'map_x' => 52.0,
                'map_y' => 52.5,
                'order' => 7,
                'is_featured' => true,
                'is_active' => true,
            ],
        ];

        foreach ($projects as $proj) {
            Project::updateOrCreate(
                ['client' => $proj['client']],
                $proj
            );
        }

        // Flush API and application cache so fresh records are instantly visible
        Cache::flush();
    }
}
