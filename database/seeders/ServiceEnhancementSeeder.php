<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Cache;

class ServiceEnhancementSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'title' => 'Web Development',
                'subtitle' => 'Modern & high-performance websites',
                'description' => 'We build modern, responsive and high-performance websites that create real business value.',
                'features' => [
                    ['title' => 'Fast & Responsive', 'description' => 'Optimized for all devices'],
                    ['title' => 'Modern UI/UX', 'description' => 'Clean and user-friendly designs'],
                    ['title' => 'Secure & Scalable', 'description' => 'Built with best practices'],
                ],
                'icon' => 'code',
                'order' => 1,
            ],
            [
                'title' => 'Mobile Applications',
                'subtitle' => 'Android & iOS mobile apps',
                'description' => 'High-impact native and cross-platform mobile apps with fluid performance and exceptional UX.',
                'features' => [
                    ['title' => 'Cross-Platform', 'description' => 'Flutter & React Native perfection'],
                    ['title' => 'High Performance', 'description' => 'Fast startup & silky 60fps animations'],
                    ['title' => 'Push & Cloud Sync', 'description' => 'Real-time cloud database integration'],
                ],
                'icon' => 'smartphone',
                'order' => 2,
            ],
            [
                'title' => 'Web Systems',
                'subtitle' => 'Custom business management systems',
                'description' => 'Scalable ERP, CRM, inventory, and automated business workflows engineered for seamless productivity.',
                'features' => [
                    ['title' => 'Smart Analytics', 'description' => 'Real-time business insights & reports'],
                    ['title' => 'Process Automation', 'description' => 'Automate invoicing, payroll & billing'],
                    ['title' => 'Role-Based Security', 'description' => 'Granular permissions and audit logs'],
                ],
                'icon' => 'layers',
                'order' => 3,
            ],
            [
                'title' => 'Social Media Marketing',
                'subtitle' => 'Creative content & brand growth',
                'description' => 'Data-driven digital marketing, brand design, and growth campaigns that convert clicks into lifelong customers.',
                'features' => [
                    ['title' => 'Targeted Ads', 'description' => 'Meta, Google & LinkedIn ad campaigns'],
                    ['title' => 'Brand Growth', 'description' => 'Engaging reels, banners & video assets'],
                    ['title' => 'SEO & Reach', 'description' => 'Organic keyword reach and authority'],
                ],
                'icon' => 'megaphone',
                'order' => 4,
            ],
            [
                'title' => 'Custom Software Solutions',
                'subtitle' => 'Tailored solutions for your business',
                'description' => 'Tailored enterprise software, API integrations, and cloud infrastructure tailored to your exact operational requirements.',
                'features' => [
                    ['title' => 'Bespoke Architecture', 'description' => 'Custom built for your workflows'],
                    ['title' => 'API Integration', 'description' => 'Connect payment gateways & external APIs'],
                    ['title' => 'Cloud Hosted', 'description' => '99.9% uptime with automated backups'],
                ],
                'icon' => 'settings',
                'order' => 5,
            ],
        ];

        foreach ($services as $data) {
            $existing = Service::where('title', 'like', '%' . explode(' ', $data['title'])[0] . '%')->first();
            if ($existing) {
                $existing->update([
                    'title' => $data['title'],
                    'subtitle' => $data['subtitle'],
                    'description' => $data['description'],
                    'features' => $data['features'],
                    'icon' => $data['icon'],
                    'order' => $data['order'],
                    'is_active' => true,
                ]);
            } else {
                Service::create([
                    'title' => $data['title'],
                    'subtitle' => $data['subtitle'],
                    'description' => $data['description'],
                    'features' => $data['features'],
                    'icon' => $data['icon'],
                    'order' => $data['order'],
                    'is_active' => true,
                ]);
            }
        }

        Cache::forget('api_services_list');
    }
}
