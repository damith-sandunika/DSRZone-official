<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('testimonials', function (Blueprint $table) {
            $table->string('company_logo')->nullable()->after('company');
            $table->string('phone')->nullable()->after('contact_details');
            $table->string('growth_stat')->nullable()->after('phone');
            $table->json('social_links')->nullable()->after('growth_stat');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('testimonials', function (Blueprint $table) {
            $table->dropColumn(['company_logo', 'phone', 'growth_stat', 'social_links']);
        });
    }
};
