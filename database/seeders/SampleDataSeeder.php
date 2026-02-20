<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Service;
use App\Models\Project;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class SampleDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Services
        $services = [
            [
                'title' => 'Web Development',
                'description' => 'Custom web applications built with modern technologies like React, Laravel, and Node.js. We create scalable, secure, and high-performance web solutions.',
                'icon' => '🌐',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Mobile Apps',
                'description' => 'Native and cross-platform mobile applications for iOS and Android. We deliver user-friendly apps that engage and convert.',
                'icon' => '📱',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Cloud Solutions',
                'description' => 'Scalable cloud infrastructure and deployment services. We help you migrate to the cloud and optimize your infrastructure.',
                'icon' => '☁️',
                'order' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'UI/UX Design',
                'description' => 'Beautiful and intuitive user interfaces that enhance user experience and drive engagement.',
                'icon' => '🎨',
                'order' => 4,
                'is_active' => true,
            ],
            [
                'title' => 'API Development',
                'description' => 'RESTful and GraphQL APIs for seamless integration between systems and services.',
                'icon' => '🔌',
                'order' => 5,
                'is_active' => true,
            ],
            [
                'title' => 'Consulting',
                'description' => 'Expert technology consulting and strategy to help you make informed decisions about your digital transformation.',
                'icon' => '💼',
                'order' => 6,
                'is_active' => true,
            ],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }

        // Products
        $products = [
            [
                'slug' => 'digital-branding-suite',
                'name' => 'Digital Branding Suite',
                'tagline' => 'Logo, identity & brand guidelines',
                'description' => 'Complete brand identity packages for startups and enterprises. Stand out with a cohesive visual identity.',
                'long_description' => 'Our Digital Branding Suite gives you a complete visual identity: logo design, color palette, typography, and brand guidelines. We work with you to capture your vision and deliver assets you can use across all touchpoints—web, print, and social.',
                'icon' => '◆',
                'status' => 'available',
                'features' => ['Logo design & variations', 'Brand guidelines document', 'Color palette & typography', 'Social media kit', 'Business card & letterhead'],
                'order' => 1,
                'is_active' => true,
            ],
            [
                'slug' => 'web-app-development',
                'name' => 'Web & App Development',
                'tagline' => 'Custom software & platforms',
                'description' => 'From responsive websites to full-scale web and mobile applications. Built with modern stacks.',
                'long_description' => 'We build custom web and mobile applications tailored to your business. From responsive marketing sites to full-scale SaaS platforms and native or cross-platform apps, we use modern stacks and best practices to deliver fast, scalable solutions.',
                'icon' => '◇',
                'status' => 'available',
                'features' => ['Responsive websites', 'Web applications (React, Laravel)', 'Mobile apps (iOS & Android)', 'API development', 'Maintenance & support'],
                'order' => 2,
                'is_active' => true,
            ],
            [
                'slug' => 'graphic-visual-design',
                'name' => 'Graphic & Visual Design',
                'tagline' => 'Print & digital assets',
                'description' => 'Brochures, social graphics, UI design, and marketing collateral. Pixel-perfect delivery.',
                'long_description' => 'Get print and digital assets that match your brand. We deliver brochures, flyers, social media graphics, UI/UX design, and marketing collateral with pixel-perfect quality and fast turnaround.',
                'icon' => '◈',
                'status' => 'available',
                'features' => ['Brochures & flyers', 'Social media graphics', 'UI/UX design', 'Illustration & icon sets', 'Marketing collateral'],
                'order' => 3,
                'is_active' => true,
            ],
        ];
        foreach ($products as $product) {
            Product::create($product);
        }

        // Projects
        $projects = [
            [
                'title' => 'E-Commerce Platform',
                'description' => 'A modern e-commerce solution with advanced features including inventory management, payment processing, and analytics dashboard.',
                'category' => 'Web Development',
                'client' => 'Retail Corp',
                'project_date' => now()->subMonths(3),
                'project_url' => 'https://example.com',
                'technologies' => ['Laravel', 'React', 'MySQL', 'Stripe API'],
                'order' => 1,
                'is_featured' => true,
                'is_active' => true,
            ],
            [
                'title' => 'Mobile Banking App',
                'description' => 'Secure mobile banking application with biometric authentication and real-time transaction processing.',
                'category' => 'Mobile Development',
                'client' => 'Finance Bank',
                'project_date' => now()->subMonths(6),
                'project_url' => 'https://example.com',
                'technologies' => ['React Native', 'Node.js', 'MongoDB'],
                'order' => 2,
                'is_featured' => true,
                'is_active' => true,
            ],
            [
                'title' => 'Cloud Migration',
                'description' => 'Enterprise cloud infrastructure migration from on-premise to AWS, reducing costs by 40% and improving scalability.',
                'category' => 'Cloud Solutions',
                'client' => 'Tech Enterprise',
                'project_date' => now()->subMonths(9),
                'technologies' => ['AWS', 'Docker', 'Kubernetes'],
                'order' => 3,
                'is_featured' => false,
                'is_active' => true,
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }

        // Testimonials
        $testimonials = [
            [
                'name' => 'Sarah Johnson',
                'position' => 'CEO',
                'company' => 'Retail Corp',
                'testimonial' => 'Sldigitasystem transformed our online presence. Their team delivered an exceptional e-commerce platform that exceeded our expectations.',
                'rating' => 5,
                'order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Michael Chen',
                'position' => 'CTO',
                'company' => 'Finance Bank',
                'testimonial' => 'The mobile banking app they developed is outstanding. Secure, fast, and user-friendly. Highly recommend their services.',
                'rating' => 5,
                'order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Emily Rodriguez',
                'position' => 'Operations Director',
                'company' => 'Tech Enterprise',
                'testimonial' => 'Their cloud migration expertise helped us modernize our infrastructure. Professional, efficient, and results-driven.',
                'rating' => 5,
                'order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }
    }
}

