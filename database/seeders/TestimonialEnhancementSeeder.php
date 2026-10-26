<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialEnhancementSeeder extends Seeder
{
    public function run(): void
    {
        $reviews = [
            [
                'name' => 'Kasun Perera',
                'position' => 'Managing Director',
                'company' => 'Rapid Laundromat Group',
                'phone' => '+61 412 345 678',
                'growth_stat' => '50% Faster Operations',
                'testimonial' => 'DSRZone developed our Laundry Management System exactly as we needed. The team understood our requirements very well and delivered a user-friendly system with great support. Our daily operations are now much easier and more efficient.',
                'rating' => 5,
                'order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Sanduni Fernando',
                'position' => 'Owner',
                'company' => 'Spice Hub Restaurant',
                'phone' => '+94 77 234 5678',
                'growth_stat' => '3x Table Turnover',
                'testimonial' => 'The POS and online ordering system designed by DSRZone boosted our table turns and takeout orders significantly. Outstanding UI and reliable 24/7 uptime for our branches.',
                'rating' => 5,
                'order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Dilan Jayasinghe',
                'position' => 'Director',
                'company' => 'Sisira Driving School',
                'phone' => '+94 71 889 9001',
                'growth_stat' => '80% Less Paperwork',
                'testimonial' => 'Managing student appointments and exam dates was chaotic until DSRZone deployed our customized management portal. Extremely professional team and swift execution!',
                'rating' => 5,
                'order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Nadee Perera',
                'position' => 'Owner',
                'company' => 'Tasty Bites',
                'phone' => '+94 76 543 2198',
                'growth_stat' => '2x Customer Retention',
                'testimonial' => 'From brand identity and logos to their seamless web system, DSRZone exceeded our expectations. Our customer engagement doubled within the first few months.',
                'rating' => 5,
                'order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'Ruwan Chamara',
                'position' => 'Director',
                'company' => 'Drive Master',
                'phone' => '+94 70 112 3344',
                'growth_stat' => '99.9% Booking Accuracy',
                'testimonial' => 'A genuinely world-class team. DSRZone\'s automated scheduling and notification platform transformed our client communications and instructor workflows completely.',
                'rating' => 5,
                'order' => 5,
                'is_active' => true,
            ],
        ];

        foreach ($reviews as $rev) {
            Testimonial::updateOrCreate(
                ['name' => $rev['name']],
                $rev
            );
        }
    }
}
