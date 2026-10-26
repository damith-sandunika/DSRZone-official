<?php

namespace App\Http\Resources;

use App\Services\MediaService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TestimonialResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $media = app(MediaService::class);

        return [
            'id' => $this->id,
            'name' => $this->name,
            'position' => $this->position,
            'company' => $this->company,
            'company_logo' => $media->url($this->company_logo),
            'phone' => $this->phone ?: $this->contact_details,
            'contact_details' => $this->contact_details,
            'growth_stat' => $this->growth_stat ?: '50% Faster Operations',
            'social_links' => $this->social_links ?: [],
            'product_name' => $this->product_name,
            'testimonial' => $this->testimonial,
            'avatar' => $media->url($this->avatar),
            'rating' => (int) ($this->rating ?? 5),
            'order' => (int) ($this->order ?? 0),
        ];
    }
}
