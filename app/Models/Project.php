<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'title',
        'description',
        'logo',
        'problem',
        'solution',
        'image',
        'category',
        'client',
        'project_date',
        'project_url',
        'technologies',
        'order',
        'is_featured',
        'is_active',
        'map_x',
        'map_y',
        'map_city',
    ];

    protected $casts = [
        'technologies' => 'array',
        'project_date' => 'date',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}

