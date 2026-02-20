<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->string('background_image', 500)->nullable()->after('logo');
            $table->string('price_one_time', 50)->nullable()->after('background_image');
            $table->string('price_monthly', 50)->nullable()->after('price_one_time');
            $table->string('price_note', 255)->nullable()->after('price_monthly');
            $table->string('cta_primary_text', 100)->nullable()->after('price_note');
            $table->string('cta_primary_url', 500)->nullable()->after('cta_primary_text');
            $table->string('cta_secondary_text', 100)->nullable()->after('cta_primary_url');
            $table->string('cta_secondary_url', 500)->nullable()->after('cta_secondary_text');
            $table->json('benefits')->nullable()->after('features');
            $table->json('installation_steps')->nullable()->after('benefits');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn([
                'background_image', 'price_one_time', 'price_monthly', 'price_note',
                'cta_primary_text', 'cta_primary_url', 'cta_secondary_text', 'cta_secondary_url',
                'benefits', 'installation_steps',
            ]);
        });
    }
};
