<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContactDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'email' => $this->email,
            'phone' => $this->phone,
            'location' => $this->location ?: 'Colombo, Sri Lanka',
            'working_hours' => $this->working_hours ?: 'Mon - Fri | 9.00 AM - 6.00 PM',
            'linkedin_url' => $this->linkedin_url,
            'facebook_url' => $this->facebook_url,
            'twitter_url' => $this->twitter_url,
            'instagram_url' => $this->instagram_url,
            'youtube_url' => $this->youtube_url,
            'whatsapp' => $this->whatsapp,
        ];
    }
}
