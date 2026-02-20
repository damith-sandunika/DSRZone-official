<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactDetail extends Model
{
    protected $fillable = [
        'email',
        'phone',
        'linkedin_url',
        'facebook_url',
        'whatsapp',
    ];

    /** Get the single contact details row (singleton). */
    public static function get(): self
    {
        $row = static::first();
        if ($row) {
            return $row;
        }
        return static::create([
            'email' => null,
            'phone' => null,
            'linkedin_url' => null,
            'facebook_url' => null,
            'whatsapp' => null,
        ]);
    }
}
