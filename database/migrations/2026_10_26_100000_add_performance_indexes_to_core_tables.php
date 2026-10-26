<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->index(['is_active', 'order'], 'services_is_active_order_idx');
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->index(['is_active', 'order'], 'projects_is_active_order_idx');
            $table->index(['is_active', 'is_featured', 'order'], 'projects_featured_order_idx');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->index(['is_active', 'order'], 'products_is_active_order_idx');
        });

        Schema::table('testimonials', function (Blueprint $table) {
            $table->index(['is_active', 'order'], 'testimonials_is_active_order_idx');
        });

        Schema::table('contact_messages', function (Blueprint $table) {
            $table->index(['is_read', 'created_at'], 'contact_messages_read_created_idx');
        });
    }

    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropIndex('services_is_active_order_idx');
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->dropIndex('projects_is_active_order_idx');
            $table->dropIndex('projects_featured_order_idx');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->dropIndex('products_is_active_order_idx');
        });

        Schema::table('testimonials', function (Blueprint $table) {
            $table->dropIndex('testimonials_is_active_order_idx');
        });

        Schema::table('contact_messages', function (Blueprint $table) {
            $table->dropIndex('contact_messages_read_created_idx');
        });
    }
};
