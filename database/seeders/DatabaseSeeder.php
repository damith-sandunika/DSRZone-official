<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database securely.
     */
    public function run(): void
    {
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

        $this->call([
            DsrZoneProductionSeeder::class,
            TestimonialEnhancementSeeder::class,
        ]);
    }
}
