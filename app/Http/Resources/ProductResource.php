<?php

namespace App\Http\Resources;

use App\Services\MediaService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'slug' => $this->slug,
            'name' => $this->name,
            'tagline' => $this->tagline,
            'desc' => $this->description,
            'longDesc' => $this->long_description,
            'icon' => $media->url($this->icon),
            'logo' => $media->url($this->logo),
            'background_image' => $media->url($this->background_image),
            'gallery_images' => $media->urlArray($this->gallery_images ?? []),
            'background_overlay' => $this->background_overlay !== null ? (int) $this->background_overlay : 35,
            'price_one_time' => $this->price_one_time,
            'price_monthly' => $this->price_monthly,
            'price_note' => $this->price_note,
            'cta_primary_text' => $this->cta_primary_text,
            'cta_primary_url' => $this->cta_primary_url,
            'cta_secondary_text' => $this->cta_secondary_text,
            'cta_secondary_url' => $this->cta_secondary_url,
            'status' => $this->status,
            'accent_color' => $this->accent_color ? trim($this->accent_color) : null,
            'features' => $this->features ?? [],
            'benefits' => $this->formatBenefits($this->benefits ?? [], $media),
            'installation_steps' => $this->formatSteps($this->installation_steps ?? [], $media),
            'projects' => ProjectResource::collection($this->whenLoaded('projects')),
        ];
    }

    private function formatBenefits(array $benefits, MediaService $media): array
    {
        return array_map(function ($b) use ($media) {
            if (is_array($b) && isset($b['icon']) && $b['icon'] !== '') {
                $b['icon'] = $media->url($b['icon']);
            }
            return $b;
        }, $benefits);
    }

    private function formatSteps(array $steps, MediaService $media): array
    {
        return array_map(function ($s) use ($media) {
            if (is_array($s) && isset($s['icon']) && $s['icon'] !== '') {
                $s['icon'] = $media->url($s['icon']);
            }
            return $s;
        }, $steps);
    }
}
