<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'name',
        'tagline',
        'description',
        'long_description',
        'icon',
        'logo',
        'background_image',
        'gallery_images',
        'background_overlay',
        'price_one_time',
        'price_monthly',
        'price_note',
        'cta_primary_text',
        'cta_primary_url',
        'cta_secondary_text',
        'cta_secondary_url',
        'status',
        'accent_color',
        'features',
        'benefits',
        'installation_steps',
        'order',
        'is_active',
    ];

    protected $casts = [
        'features' => 'array',
        'benefits' => 'array',
        'gallery_images' => 'array',
        'installation_steps' => 'array',
        'is_active' => 'boolean',
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function projects()
    {
        return $this->hasMany(Project::class)->orderBy('order')->orderBy('id', 'desc');
    }
}
