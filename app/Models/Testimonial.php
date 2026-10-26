<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'position',
        'company',
        'company_logo',
        'product_name',
        'contact_details',
        'phone',
        'growth_stat',
        'social_links',
        'testimonial',
        'avatar',
        'rating',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'social_links' => 'array',
    ];
}

